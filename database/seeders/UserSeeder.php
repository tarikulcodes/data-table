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
        $testUsers = [
            [
                'name' => 'Admin Test',
                'email' => 'admin@test.com',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Manager Test',
                'email' => 'manager@test.com',
                'role' => 'manager',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'User Test',
                'email' => 'user@test.com',
                'role' => 'user',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        ];

        foreach ($testUsers as $user) {
            User::firstOrCreate([
                'email' => $user['email'],
            ], $user);
        }
        User::factory(50)->create();
    }
}
