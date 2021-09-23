<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commit extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'author', 'is_verified', 'committed_at', 'sha_hash'];

    protected $appends = ['short_message', 'committed_ago'];

    protected $dates = ['committed_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function repository(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    public function getShortMessageAttribute()
    {
        return preg_split('/\r\n|\n|\r/', $this->message)[0];
    }

    public function getCommittedAgoAttribute()
    {
        return $this->committed_at->diffForHumans();
    }
}
