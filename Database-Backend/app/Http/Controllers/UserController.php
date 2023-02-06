<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    function signup(request $req) {
        
        $user = \App\Models\User::create([
            'name' => $req->fname,
            'unm' => $req->unm,
            'email' => $req->email,
            'password' => Hash::make($req->pwd)
        ]);
        $user->profile()->create([
            'profile_pic'=>'null',
            'cover_pic'=>'null',
        ]);
        return [
            'msg'=>'success',
            'userInfo'=>$user->load('profile')
        ];
    }

    function login(request $req) {
        $user = \App\Models\User::where('unm',$req->unm)->orWhere('email',$req->unm)->first();
        if(!$user || !Hash::check($req->pwd, $user->password)) {

            return ['msg'=>'user not found'];
        } else {
            return ['msg'=>'success','user'=>$user->load('profile')];
        }
    }

    function profileView($user) {
        $u = \App\Models\User::where('unm',$user)->first();
        if($u) {
            return ['msg'=>'success','user'=>$u, 'posts'=>$u->post->load('like'),'profile'=>$u->profile];
        } else {
            return ['msg'=>'error404'];
        }
    }

    function newsFeed() {
        // $posts = \App\Models\Post::orderBy('id','desc')->get();
        $posts = \App\Models\Post::with(['user','user.profile','like'])->orderBy('id','desc')->get();
        if(count($posts) > 0) {
            return ['msg'=>'success', 'posts'=>$posts];
        } else {
            return ['msg'=>'empty'];
        }
    }

}
