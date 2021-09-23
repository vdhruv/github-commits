<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Github\Client;
use App\Http\Controllers\Controller;
use App\Models\Commit;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RepositoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return jsonResponse('Success', [
            'repositories' => Repository::withCount('commits')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner' => 'required|string|max:250',
            'repository' => 'required|string|max:250'
        ]);

        if ($validator->fails()) {
            return jsonResponse($validator->errors()->first(), [], false);
        }

        if (Repository::whereName($request->repository)->whereOwner($request->owner)->exists()) {
            return jsonResponse('Repository already exists', [], false);
        }

        $repository = DB::transaction(function () use ($request) {
            $repository = Client::repository($request->owner, $request->repository);
            if (!$repository->get('id')) {
                throw new \Exception('Repository not found');
            }

            $repository = Repository::create([
                'name' => $repository['name'],
                'full_name' => $repository['full_name'],
                'owner' => $repository['owner']['login'],
                'description' => $repository['description'],
                'public_url' => $repository['html_url'],
                'forks' => $repository['forks'],
                'watchers' => $repository['watchers']
            ]);

            $commits = Client::commits($request->owner, $request->repository);
            foreach ($commits as $commit) {
                $this->storeCommit($repository, $commit);
            }

            return $repository;
        });

        return jsonResponse('Repository has been added.', [
            'repository' => $repository->loadCount('commits')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Repository $repository
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Repository $repository)
    {
        if (!$repository->exists)
            return jsonResponse('Repository not found', [], false);

        $repository->load('commits');

        return jsonResponse('Success', compact('repository'));
    }

    public function syncCommits()
    {
        $repos = Repository::with('commits:id,sha_hash')->get();

        foreach ($repos as $repo) {
            $commits = Client::commits($repo->owner, $repo->name);
            foreach ($commits as $commit) {
                if (!isset($commit['sha'])) break;

                if ($repo->commits()->where('sha_hash', $commit['sha'])->exists()) {
                    break;
                } else {
                    $this->storeCommit($repo, $commit);
                }
            }
        }

        return jsonResponse('Success', [
            'repositories' => Repository::withCount('commits')->get()
        ]);
    }

    /**
     * @param $repository
     * @param $commit
     */
    protected function storeCommit($repository, $commit): void
    {
        $repository->commits()->create([
            'message' => $commit['commit']['message'],
            'author' => $commit['author']['login'] ?? 'null',
            'is_verified' => $commit['commit']['verification']['verified'] == true,
            'committed_at' => $commit['commit']['author']['date'],
            'sha_hash' => $commit['sha']
        ]);
    }
}
