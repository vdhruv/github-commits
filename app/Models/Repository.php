<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'full_name', 'description', 'owner', 'public_url', 'watchers', 'forks'];

    public function commits(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Commit::class)->orderByDesc('committed_at');
    }
}
