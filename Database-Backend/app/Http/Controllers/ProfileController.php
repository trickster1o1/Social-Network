<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    function getProfile($user) {
        $user = \App\Models\User::findOrFail($user);
        if(!$user) {
            return ['msg'=>'error404'];
        } else {
            return ['msg'=>'success', 'profile'=>$user->profile];
        }
    }

    function setProfile($user, request $req) {
        $user = \App\Models\User::findOrFail($user);
        if(!$user) {
            return ['msg'=>'error404'];
        } else {

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


    function updateProfile($user, request $req) {
        $user = \App\Models\User::findOrFail($user);
        $pic = '';
        if(!$user) {
            return ['msg'=>'error404'];
        } else {
            if(!empty($req->file('profilePic'))) {
                if(file_exists('storage/'.$user->profile->profile_pic)) {
                    unlink('storage/'.$user->profile->profile_pic);
                }
                $user->profile()->update([
                    'profile_pic'=>$req->file('profilePic')->store('profile','public')
                ]);
                $pic = $pic.'Profile';
            }
            if(!empty($req->file('coverPic'))) {
                if(file_exists('storage/'.$user->profile->cover_pic)) {
                    unlink('storage/'.$user->profile->cover_pic);
                }
                $user->profile()->update([
                    'cover_pic'=>$req->file('coverPic')->store('profile','public')
                ]);
                $pic = $pic.' Cover';
            }
            $user->profile()->update([
                'number'=>$req->input('phone'),
                'gender'=>$req->input('gender'),
                'description'=>$req->input('description')
            ]);
            return ['msg'=>'success','stat'=>$pic];

        }
    }
}
