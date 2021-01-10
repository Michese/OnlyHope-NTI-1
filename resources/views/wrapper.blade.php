<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <title>OnlyHope</title>

</head>
<body>
    @yield('content')
</body>
<script defer src="{{ asset('/js/app.js') }}"></script>
</html>
