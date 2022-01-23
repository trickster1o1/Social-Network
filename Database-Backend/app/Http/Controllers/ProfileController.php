<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    function setProfile($user, request $req) {
        $user = \App\Models\User::findOrFail($user);
        if(!$user) {
            return ['msg'=>'error404'];
        } else {
            $user->profile()->create([
                'number'=>$req->input('phone'),
                'profile_pic'=>'null',
                'cover_pic'=>'null',
                'gender'=>$req->input('gender'),
                'description'=>$req->input('description')
            ]);
            return ['msg'=>'success'];
        }
    }
}
