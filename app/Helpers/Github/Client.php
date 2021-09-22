<?php

namespace App\Helpers\Github;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class Client
{
    const API_URL = 'https://api.github.com/repos/:user/:repo/commits';

    public static function commits(string $user, string $repository)
    {
        $url = Str::of(self::API_URL)
            ->replace(':user', $user)
            ->replace(':repo', $repository)
            ->lower();

        $commits = Http::get($url)->collect();


    }
}