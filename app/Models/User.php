<?php

namespace App\Models;

use DateTime;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isEmpty;

/**
 * App\Models\User
 *
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $forceDeleting = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    private function validateDate($date, $format = 'Y-m-d H:i:s')
    {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }

    private function getFields(): array
    {
        return [
            'bdate',
            'sex',
            'city',
            'last_seen',
            'Education',
            'career',
            'has_photo',
            'interests',
            'followers_count',
            'counters',
            'contacts'
        ];
    }

    private function getUsersVkQuery(array $userIds): array
    {
        $vkAccessToken = env('VK_ACCESS_TOKEN');

        $fields = $this->getFields();
//        dd($usersQuery);
        $resultQuery = [];

        foreach ($userIds as $userId) {
            $query = 'https://api.vk.com/method/users.get?user_ids=' . $userId .
                '&fields=';

            foreach ($fields as $key => $field) {
                if ($key == 0) {
                    $query .= $field;
                } else {
                    $query .= ',' . $field;
                }
            }
            $query .= '&v=5.126&access_token=' . $vkAccessToken;
            $result = json_decode(file_get_contents($query), true);
            if (isset($result['response']) && isset($result['response'][0])) {
                $resultQuery[$userId] = $result['response'][0];
            }
        }


        return $resultQuery;
    }

    public function softDeleteRedRow()
    {
        return self::where('color', '=', 'red')
            ->delete();
    }

    private function getResultFriendsAndGroupsVkQuery(array $userIds): array
    {
        $vkAccessToken = env('VK_ACCESS_TOKEN');
        $resultQuery = [];
        foreach ($userIds as $key => $userId) {
            $query = 'https://api.vk.com/method/friends.get?user_id=' . $userId .
                '&count=0&v=5.126&access_token=' . $vkAccessToken;
            $resultFriendsQuery = json_decode(file_get_contents($query), true);

            $query = 'https://api.vk.com/method/groups.get?user_id=' . $userId .
                '&count=0&v=5.126&access_token=' . $vkAccessToken;
            $resultGroupsQuery = json_decode(file_get_contents($query), true);


            if (isset($resultFriendsQuery['response'])) {
                if (isset($resultGroupsQuery['response'])) {
                    $resultQuery[] = [
                        'id' => $userId,
                        'friends_count' => $resultFriendsQuery['response']['count'],
                        'groups_count' => $resultGroupsQuery['response']['count']
                    ];
                } else {
                    $resultQuery[] = [
                        'id' => $userId,
                        'friends_count' => $resultFriendsQuery['response']['count'],
                        'groups_count' => 0
                    ];
                }
            } else {
                if (isset($resultGroupsQuery['response'])) {
                    $resultQuery[] = [
                        'id' => $userId,
                        'friends_count' => 0,
                        'groups_count' => $resultGroupsQuery['response']['count']
                    ];
                } else {
                    $resultQuery[] = [
                        'id' => $userId,
                        'friends_count' => 0,
                        'groups_count' => 0
                    ];
                }
            }
        }

        return $resultQuery;
    }

    private function generateRandomId(int $count): array
    {
        $array = self::all()->pluck('id')->toArray();
        $result = [];
//        $result[] = 557872716;

        for (; $count > 0; $count--) {
            $number = rand(1, 632912292);
            if (!array_search($number, $array)) {
                $result[] = $number;
            } else {
                $count++;
            }
        }
        return $result;
    }

    public function getLastIndex()
    {
        return (self::latest('number')->first())->number;
    }

    public function generateUsers(int $count): array
    {
        $userIds = $this->generateRandomId($count);

        $usersQuery = $this->getUsersVkQuery($userIds);

        foreach ($usersQuery as $key => $userQuery) {
            if (isset($userQuery['last_seen'])) {
                $userQuery['last_seen'] = new DateTime(gmdate("Y-m-d\TH:i:s\Z", $userQuery['last_seen']['time']));
                $now = new DateTime();
                $interval = $userQuery['last_seen']->diff($now);
                $userQuery['is_old_last_seen'] = ((int)$interval->format('%y')) > 0;
                $userQuery['last_seen'] = $userQuery['last_seen']->format('Y-m-d H:i:s');
            } else {
                $userQuery['last_seen'] = '-';
            }

//            dump($userQuery);
            if (isset($userQuery['bdate']) && $this->validateDate($userQuery['bdate'], 'd.m.Y')) {
                $userQuery['bdate'] = new DateTime($userQuery['bdate']);
                $now = new DateTime();
                $interval = (int)$userQuery['bdate']->diff($now)->format('%y');
                $userQuery['isAdult'] = $interval >= 16 && $interval < 100;
//                $userQuery['bdate'] = $userQuery['bdate']->format('Y-m-d');
                $userQuery['bdate'] = $interval;
            } else {
                $userQuery['bdate'] = '-';
            }

            if (isset($userQuery['deactivated']) ||
                $userQuery['has_photo'] == 0 ||
                $userQuery['counters']['friends'] == 0 ||
                $userQuery['last_seen'] != '-' && $userQuery['is_old_last_seen'] == true ||
                $userQuery['bdate'] != '-' && $userQuery['isAdult'] == false) {
                $userQuery['color'] = 'red';
            } else if (isset($userQuery['is_closed']) && $userQuery['is_closed'] == true) {
                $userQuery['color'] = 'blue';
            } else {
                $userQuery['color'] = 'green';
            }

            if ($userQuery['sex'] == 0) {
                $userQuery['sex'] = '-';
            } else if ($userQuery['sex'] == 1) {
                $userQuery['sex'] = 'Ж';
            } else {
                $userQuery['sex'] = 'М';
            }

            if ($userQuery['has_photo'] == 1) {
                $userQuery['has_photo'] = 'Да';
            } else {
                $userQuery['has_photo'] = 'Нет';
            }

            if (!isset($userQuery['mobile_phone']) || $userQuery['mobile_phone'] == '') {
                $userQuery['mobile_phone'] = '-';
            }

            if (!isset($userQuery['interests']) || $userQuery['interests'] == '') {
                $userQuery['interests'] = '-';
            }

            if (!isset($userQuery['counters']) || $userQuery['counters'] == '') {
                $userQuery['community'] = 0;
                $userQuery['friends'] = 0;
            } else {
                $userQuery['friends'] = $userQuery['counters']['friends'];
                if (!isset($userQuery['counters']['groups'])) {
                    $userQuery['community'] = 0;
                } else {
                    $userQuery['community'] = $userQuery['counters']['groups'];
                }
            }

            if (!isset($userQuery['followers_count']) || $userQuery['followers_count'] == '') {
                $userQuery['followers_count'] = 0;
            }

            if (!isset($userQuery['university_name']) || $userQuery['university_name'] == '') {
                $userQuery['university_name'] = '-';
            }

            if (!isset($userQuery['city']) || $userQuery['city'] == '') {
                $userQuery['city'] = [];
                $userQuery['city'] = '-';
            } else {
                $userQuery['city'] = $userQuery['city']['title'];
            }

            if (!isset($userQuery['career']) || $userQuery['career'] == []) {
                $userQuery['career'] = '-';
            } else {
                $value = "";
                foreach ($userQuery['career'] as $keyC => $career) {
                    if ($keyC == 0) {
                        $value .= $userQuery['career'][0]['position'];
                    } else {
                        $value .= ', ' . $userQuery['career'][0]['position'];
                    }
                }
                $userQuery['career'] = $value;
            }

            $userQuery['email'] = 'email';

            $usersQuery[$key] = $userQuery;
        }

        $this->addUserToDataBase($usersQuery);
        return $usersQuery;
    }


    public function addUserToDataBase(array $users)
    {
        foreach ($users as $user) {
            self::insert([
                'id' => $user['id'],
                'color' => $user['color'],
                'last_name' => $user['last_name'],
                'first_name' => $user['first_name'],
                'sex' => $user['sex'],
                'bdate' => $user['bdate'],
                'city' => $user['city'],
                'last_seen' => $user['last_seen'],
                'university_name' => $user['university_name'],
                'career' => $user['career'],
                'has_photo' => $user['has_photo'],
                'interests' => $user['interests'],
                'community' => $user['community'],
                'friends' => $user['friends'],
                'followers_count' => $user['followers_count'],
                'mobile_phone' => $user['mobile_phone'],
                'email' => $user['email']
            ]);
        }
    }

    public function getAllUsersFromDB()
    {
        return User::query()
            ->orderBy('number')
            ->get();
    }

    public function getLastUser()
    {
        return self::latest('number')->first();
    }

    public function clear()
    {
        DB::table('users')
            ->delete();
    }

    public function getAllUsersByFilter(array $arrayFilter, array $arrayPriority)
    {
        $sql = "select * from users where deleted_at is null ";
        foreach ($arrayFilter as $filter) {
                $sql .= "and " . $filter->title . " = '" . $filter->value . "' ";
        }

        $flag = true;
        foreach ($arrayPriority as $priority) {
            if ($priority->value == '1') {
                $str = 'asc ';
            } else {
                $str = 'desc ';
            }

            if ($flag == true) {
                $flag = false;
                $sql .= "order by " . $priority->title . " " . $str;
            } else {
                $sql .= ', ' . $priority->title . ' ' . $str;
            }
        }
//        dd($sql);
        $query = DB::select($sql);
        return $query;
    }
}
