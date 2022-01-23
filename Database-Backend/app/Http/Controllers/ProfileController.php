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
            // $user->profile()->create([
            //     'number'=>$req->input('phone'),
            //     'profile_pic'=>'null',
            //     'cover_pic'=>'null',
            //     'gender'=>$req->input('gender'),
            //     'description'=>$req->input('description')
            // ]);
            if(empty($req->file('profilePic')) && empty($req->file('coverPic')) ) {
                $user->profile()->create([
                    'number'=>$req->input('phone'),
                    'profile_pic'=>'null',
                    'cover_pic'=>'null',
                    'gender'=>$req->input('gender'),
                    'description'=>$req->input('description')
                ]);
                return ['msg'=>'Both empty'];
            } else if(!empty($req->file('profilePic')) && empty($req->file('coverPic')) ) {
                $user->profile()->create([
                    'number'=>$req->input('phone'),
                    'profile_pic'=>$req->file('profilePic')->store('profile','public'),
                    'cover_pic'=>'null',
                    'gender'=>$req->input('gender'),
                    'description'=>$req->input('description')
                ]);
                return ['msg'=>'profile pic'];
            }  else if(empty($req->file('profilePic')) && !empty($req->file('coverPic'))) {
                $user->profile()->create([
                    'number'=>$req->input('phone'),
                    'profile_pic'=>'null',
                    'cover_pic'=>$req->file('coverPic')->store('profile','public'),
                    'gender'=>$req->input('gender'),
                    'description'=>$req->input('description')
                ]);
                return ['msg'=>'cover pic'];
            } else {
                // $req->file('profilePic')->store('profile','public');
                    $user->profile()->create([
                        'number'=>$req->input('phone'),
                        'profile_pic'=>$req->file('profilePic')->store('profile','public'),
                        'cover_pic'=>$req->file('coverPic')->store('profile','public'),
                        'gender'=>$req->input('gender'),
                        'description'=>$req->input('description')
                    ]);
                return ['msg'=>'both is there'];
            }
        }
    }
}
