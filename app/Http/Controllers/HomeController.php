<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use PhpParser\Node\Scalar\String_;
use function PHPUnit\Framework\isNull;

class HomeController extends Controller
{
    public function index(User $user)
    {
        $users = $user->getAllUsersFromDB();
        return view('welcome', ['users' => $users]);
    }

    public function add(User $user)
    {
        $users = $user->generateUsers(1);
        $result = [];
        foreach ($users as $key => $value) {
            $result = $user->query()->where('id', '=', $key)->first()->toArray();
        }
        return $result;
    }

    public function clear(User $user)
    {
        $user->clear();
        return redirect('/');
    }

    public function deleteRedRows(Request $request, User $user)
    {
        $user->softDeleteRedRow();
        $post = $request->input('generalObject');
        $generalObject = json_decode($post);
        $users = $user->getAllUsersByFilter($generalObject->arrayFilter, $generalObject->arrayPriority);
        return $users;
    }

    public function allUsers(Request $request, User $user)
    {
        $post = $request->input('generalObject');
        $generalObject = json_decode($post);
        $users = $user->getAllUsersByFilter($generalObject->arrayFilter, $generalObject->arrayPriority);
        return $users;
    }
}
