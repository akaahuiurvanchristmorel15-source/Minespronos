<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function linkOneWin(Request $request)
    {
        $request->validate([
            'onewin_id' => 'required|string|min:4|max:20',
        ]);

        $user = $request->user();
        $user->update([
            'onewin_id' => $request->onewin_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Compte 1win lié avec succès.'
        ]);
    }
}
