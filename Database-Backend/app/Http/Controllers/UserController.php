<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    function signup(request $req) {
        // $user = new \App\Models\User;
        // $user->name = $req->fname;
        // $user->unm = $req->unm;
        // $user->email = $req->email;
        // $user->password = Hash::make($req->pwd);
        // $user->save();
        
        $user = \App\Models\User::create([
            'name' => $req->fname,
            'unm' => $req->unm,
            'email' => $req->email,
            'password' => Hash::make($req->pwd)
        ]);
        return [
            'msg'=>'success',
            'userInfo'=>$user
        ];
    }

    function login(request $req) {
        $user = \App\Models\User::where('unm',$req->unm)->orWhere('email',$req->unm)->first();
        if(!$user || !Hash::check($req->pwd, $user->password)) {

            return ['msg'=>'user not found'];
        } else {
            return ['msg'=>'success','user'=>$user];
        }
    }

    function profileView($user) {
        $u = \App\Models\User::where('unm',$user)->first();
        if($u) {
            return ['msg'=>'success','user'=>$u, 'posts'=>$u->post,'profile'=>$u->profile];
        } else {
            return ['msg'=>'error404'];
        }
    }

    function newsFeed() {
        $posts = \App\Models\Post::orderBy('id','desc')->get();

        if(count($posts) > 0) {
            return ['msg'=>'success', 'posts'=>$posts->load('user')];
        } else {
            return ['msg'=>'empty'];
        }
    }

}
