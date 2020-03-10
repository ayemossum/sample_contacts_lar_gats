<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Contact;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/contacts', function () {
    return Contact::all();
});

Route::get('/contacts/{id}', function ($id) {
    return Contact::findOrFail($id);;
});

Route::put('/contacts/{id}', function (Request $request, $id) {
    $contact = Contact::findOrFail($id);
    $parameters = $request->json();

    if (!$parameters->get("firstname")) {
        return response("First Name is required", 406);
    }
    if (!$parameters->get("lastname")) {
        return response("Last Name is required", 406);
    }
    if (!$parameters->get("email")) {
        return response("Email is required", 406);
    }

    $contact->firstname = $parameters->get("firstname");
    $contact->lastname = $parameters->get("lastname");
    $contact->email = $parameters->get("email");
    $contact->save();

    return [ "message" => "OK" ];
});

Route::post('/contacts', function (Request $request) {
    $parameters = $request->json();
    if ($parameters->get("id")) {
        return response("Invalid post, id given", 409);
    }
    if (!$parameters->get("firstname")) {
        return response("First Name is required", 406);
    }
    if (!$parameters->get("lastname")) {
        return response("Last Name is required", 406);
    }
    if (!$parameters->get("email")) {
        return response("Email is required", 406);
    }
    $contact = new Contact;
    $contact->firstname = $parameters->get("firstname");
    $contact->lastname = $parameters->get("lastname");
    $contact->email = $parameters->get("email");
    $contact->save();

    return [ "id" => $contact->id ];
});

Route::delete("/contacts/{id}", function ($id) {
    $contact = Contact::findOrFail($id);
    $contact->delete();
    return [ "message" => "Ok" ];
});
