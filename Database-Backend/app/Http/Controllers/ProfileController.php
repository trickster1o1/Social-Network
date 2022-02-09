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

    function followUser(request $req) {
        $user = \App\Models\User::findOrFail($req->user);
        $profile = \App\Models\User::findOrFail($req->profile);
        if(!$user || !$profile) {
            return ['msg'=>'error404'];
        } else {
            if($user->profile == null) {
                $user->profile()->create([
                    'following'=>','.$req->user.',',
                    'following_count'=>'1'
                ]);
            } else {
                if($user->profile->following == null) {
                    $user->profile()->update([
                        'following'=>','.$req->profile.',',
                        'following_count'=>'1'
                    ]);
                } else {
                    if(str_contains($user->profile->following, ','.$req->profile.',')) {
                        $following = trim($user->profile->following, ','.$req->profile.',');
                        $fc = (int) $user->profile->following_count - 1;
                    } else {
                        $fc = (int) $user->profile->following_count + 1;
                        $following = $user->profile->following.','.$req->profile.',';
                    }

                    $user->profile()->update([
                            'following'=>$following,
                            'following_count'=>$fc
                    ]);
                }
            }

            if($profile->profile == null) {
                $profile->profile()->create([
                    'follower'=>','.$req->user.',',
                    'follower_count'=>'1'
                ]);
                return ['msg'=>'followed'];
            } else {
                if(str_contains($profile->profile->follower, ','.$req->user.',')) {
                    $follower = trim($profile->profile->follower, ','.$req->user.',');
                    $fc = (int) $profile->profile->follower_count - 1;

                    $profile->profile()->update([
                        'follower'=>$follower,
                        'follower_count'=>$fc
                    ]);
                    return ['msg'=>'unfollowed'];
                } else {
                    $follower = $profile->profile->follower.','.$req->user.',';
                    $fc = (int) $profile->profile->follower_count + 1;

                    $profile->profile()->update([
                        'follower'=>$follower,
                        'follower_count'=>$fc
                    ]);
                    return ['msg'=>'followed'];
                }
            }
        }
    }
}
