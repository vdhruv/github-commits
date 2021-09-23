<?php

use Illuminate\Http\JsonResponse;

if (!function_exists('jsonResponse')) {
    /**
     * json response for api calls
     *
     * @param $message
     * @param array $data
     * @param bool $success
     *
     * @return JsonResponse
     */
    function jsonResponse(string $message, array $data = [], bool $success = true)
    {
        if ($success === false && !array_key_exists('message', $data)) {
            $data['message'] = $message;
        }

        return new JsonResponse(['success' => $success, 'message' => $message, 'data' => $data], 200);
    }
}