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

    function getPost($pos) {
        $post = \App\Models\Post::findOrFail($pos);
        $comment = \App\Models\Comment::with(['user','user.profile'])->where('post_id','=',$pos)->get();
        if(!$post) {
            return ['msg'=>'error404'];
        } else {
            return [
                'msg'=>'success', 
                'post'=>$post, 
                'like'=>$post->like, 
                'user'=>$post->user, 
                'profile'=> $post->user->profile, 
                'comments'=>$comment
            ];
        }
    }

    function postCmnt(request $req) {
        if(empty($req->reply) || empty($req->post) || empty($req->user)) {
            return ['msg'=>'empty request'];
        }

        $user = \App\Models\User::findOrFail($req->user);
        if(!$user) {
            return ['msg'=>'error404'];
        } else {
            $user->comment()->create([
                'reply'=>$req->reply,
                'post_id'=>$req->post
            ]);
            return ['msg'=>'success'];
        }
        
    }
}
