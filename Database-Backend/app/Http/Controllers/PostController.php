<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    
    function createPost(request $req, $user) {
        $u = \App\Models\User::findOrFail($user);
        if($u) {
            $u->post()->create([
                'title'=>$req->title,
                'post'=>$req->post
            ]);
            return ['msg'=>'success'];
        } else {
            return ['msg'=>'server error'];
        }
    }
}
