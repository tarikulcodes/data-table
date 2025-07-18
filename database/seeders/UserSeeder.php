<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'user@test.com',
        ], [
            'name' => 'User Test',
            'email' => 'user@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        User::factory(50)->create();
    }
}
