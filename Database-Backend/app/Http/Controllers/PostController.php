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

    function likePost($user, $post) {
        $post = \App\Models\Post::findOrFail($post);
        if(!$post){
            return ['msg'=>'error404'];
        } else {
            if($post->like == null) {
                $post->like()->create([
                    'like_count'=>'1',
                    'likes'=>','.$user.','
                ]);
                
            } else {
                if(str_contains($post->like->likes, ','.$user.',')) {
                    $r = ','.$user.',';
                    $replace = trim($post->like->likes, $r);
                    $lc = (int)$post->like->like_count - 1;
                   
                } else {
                    $lc = (int)$post->like->like_count + 1;
                    $replace = $post->like->likes.','.$user.',';
                }

                    $post->like()->update([
                        'like_count'=>''.$lc,
                        'likes'=>$replace
                    ]);
                    
            }
            return ['msg'=>'success'];
            
        }
    }

    function getPost($post) {
        $post = \App\Models\Post::findOrFail($post);
        if(!$post) {
            return ['msg'=>'error404'];
        } else {
            return ['msg'=>'success', 'post'=>$post, 'like'=>$post->like, 'user'=>$post->user, 'profile'=> $post->user->profile];
        }
    }
}
