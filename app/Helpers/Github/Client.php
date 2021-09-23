<?php

namespace App\Helpers\Github;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class Client
{
    const API_URL = 'https://api.github.com/repos/:owner/:repo';

    public static function repository(string $owner, string $repository): \Illuminate\Support\Collection
    {
        $url = Str::of(self::API_URL)
            ->replace(':owner', $owner)
            ->replace(':repo', $repository)
            ->lower();

        return Http::get($url)->collect();
    }

    public static function commits(string $owner, string $repository): \Illuminate\Support\Collection
    {
        $url = Str::of(self::API_URL . '/commits?per_page=50')
            ->replace(':owner', $owner)
            ->replace(':repo', $repository)
            ->lower();

        return Http::get($url)->collect();
    }
}