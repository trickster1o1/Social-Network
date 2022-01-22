<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    
    function createPost(request $req, $user) {
        $u = \App\Models\User::findOrFail($user);
        if($u) {
            $u->post()->create([
                'title'=>$req->input('title'),
                'post'=>$req->input('post'),
                'file'=>$req->file('file')->store('uploads','public')
            ]);
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'server error'];
        }
    }
}
