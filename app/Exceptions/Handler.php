<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
{
    $this->renderable(function (NotFoundHttpException|ModelNotFoundException $e, $request) {
        if ($request->is('api/*')) {
            return response()->json(['message' => 'Not found.'], 404);
        }

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Not found.'], 404);
        }

        return Inertia::render('Errors/NotFound')
            ->toResponse($request)
            ->setStatusCode(404);
    });
}
}
