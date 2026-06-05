<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Mines Vision')</title>
    @vite(['resources/css/app.css'])
</head>
<body class="antialiased">
    @yield('content')
    @vite(['resources/js/app.tsx'])
</body>
</html>
