<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $queryParams = request()->only(['search', 'page', 'per_page', 'sort_by', 'sort_dir']) + ['sort_by' => 'id', 'sort_dir' => 'desc', 'per_page' => 10, 'page' => 1];

        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            })
            ->orderBy($queryParams['sort_by'], $queryParams['sort_dir'])
            ->paginate($queryParams['per_page'])
            ->withQueryString();

        return Inertia::render('users/index', [
            'usersData' => UserResource::collection($users)->additional([
                'queryParams' => $queryParams,
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $inputs = $request->validated();

        $inputs['password'] = Hash::make($inputs['password']);

        User::create($inputs);

        return to_route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $inputs = $request->validated();

        if ($inputs['password']) {
            $inputs['password'] = Hash::make($inputs['password']);
        } else {
            unset($inputs['password']);
            unset($inputs['password_confirmation']);
        }

        $user->update($inputs);

        return to_route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return to_route('users.index')->with('success', 'User deleted successfully');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        User::whereIn('id', $request->ids)->delete();

        return redirect()->route('users.index')->with('success', 'Users deleted successfully');
    }
}
