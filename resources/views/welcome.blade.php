@extends('wrapper')

@section('content')

    <header class="header">
        <h1 class="hello">Таблица</h1>

        <div class="row header__buttons">
            <button type="button" class="btn btn-success" id="start">Старт</button>
            <button type="button" class="btn btn-danger" id="stop">Стоп</button>
            <button type="button" class="btn btn-primary" id="sort">Сортировка</button>
            <button type="button" class="btn btn-warning" id="output">Вывод</button>
            <a href="/clear" class="btn btn-secondary">Очистить</a>
            <button type="button" class="btn btn-dark" id="dropFilter">Сброс фильтров</button>
        </div>


        <div class="input-group mb-3" id="search">
            <input type="text" class="form-control" placeholder="Поиск" aria-label="Recipient's username"
                   aria-describedby="button-addon2" name="search" id="searchInput">
            <button class="btn btn-outline-secondary" type="button" id="searchButton">Искать</button>
            <div class="dropdown">
                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Результаты
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="searchDropdown"></div>
            </div>
            <p class="searching_result">Результат: <span id="searching_result__value">0</span></p>
        </div>
    </header>

    <main class="main">
        <table class="table table-hover">
            @include('thead')
            <tbody>
            @foreach($users as $user)
                @if($user->color == 'red')
                    <tr class="table-danger">
                @elseif($user->color == 'blue')
                    <tr class="table-primary">
                @else
                    <tr class="table-success">
                        @endif
                        <th data-title="color" scope="col" class="main-column-1">{{ $user->color }}</th>
                        <td data-title="number" class="main-column-2">{{ $user->number  }}</td>
                        <td data-title="id" class="main-column-3"><a href="https://vk.com/id{{ $user->id }}"
                                                     target="_blank">{{ $user->id }}</a></td>
                        <td data-title="last_name" class="main-column-4">{{ $user->last_name }}</td>
                        <td data-title="first_name" class="main-column-5">{{ $user->first_name }}</td>
                        <td data-title="sex" class="main-column-6">{{ $user->sex }}</td>
                        <td data-title="bdate" class="main-column-7">{{ $user->bdate }}</td>
                        <td data-title="city" class="main-column-8">{{ $user->city }}</td>
                        <td data-title="last_seen" class="main-column-9">{{ $user->last_seen }}</td>
                        <td data-title="university_name" class="main-column-10">{{ $user->university_name }}</td>
                        <td data-title="career" class="main-column-11">{{ $user->career }}</td>
                        <td data-title="has_photo" class="main-column-12">{{ $user->has_photo }}</td>
                        <td data-title="interests" class="main-column-13">{{ $user->interests }}</td>
                        <td data-title="community" class="main-column-14">{{ $user->community }}</td>
                        <td data-title="friends" class="main-column-15">{{ $user->friends }}</td>
                        <td data-title="followers_count" class="main-column-16">{{ $user->followers_count }}</td>
                        <td data-title="mobile_phone" class="main-column-17">{{ $user->mobile_phone }}</td>
                        <td data-title="email" class="main-column-18">{{ $user->email }}</td>
                    </tr>
                    @endforeach
            </tbody>
        </table>
    </main>

@endsection
