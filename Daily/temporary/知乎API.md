# 知乎API

[原文](https://www.jianshu.com/p/86139ab70b86)

1. 查看自身信息：

`https://www.zhihu.com/api/v4/me`

```json
{
  "id": "9458e5ef909b70e40cae0c03fc103a4f",
  "url_token": "xiao-cheng-64",
  "name": "哎哎艾",
  "use_default_avatar": false,
  "avatar_url": "https://pic1.zhimg.com/v2-94172782210f57863cee78eab4f49168_l.jpg",
  "avatar_url_template": "https://pic2.zhimg.com/v2-94172782210f57863cee78eab4f49168.jpg",
  "is_org": false,
  "type": "people",
  "url": "https://www.zhihu.com/api/v4/people/xiao-cheng-64",
  "user_type": "people",
  "headline": "学生",
  "gender": 1,
  "is_advertiser": false,
  "vip_info": {
    "is_vip": false,
    "rename_days": "60"
  },
  "uid": "620182626699448320",
  "default_notifications_count": 0,
  "follow_notifications_count": 0,
  "vote_thank_notifications_count": 0,
  "messages_count": 0,
  "is_realname": true,
  "has_add_baike_summary_permission": false,
  "editor_info": []
}
```

2. 用户信息：`https://www.zhihu.com/api/v4/members/{un}`

```json
{
  "id": "9458e5ef909b70e40cae0c03fc103a4f",
  "url_token": "xiao-cheng-64",
  "name": "哎哎艾",
  "use_default_avatar": false,
  "avatar_url": "https://pic1.zhimg.com/v2-94172782210f57863cee78eab4f49168_l.jpg",
  "avatar_url_template": "https://pic4.zhimg.com/v2-94172782210f57863cee78eab4f49168.jpg",
  "is_org": false,
  "type": "people",
  "url": "https://www.zhihu.com/api/v4/people/xiao-cheng-64",
  "user_type": "people",
  "headline": "学生",
  "gender": 1,
  "is_advertiser": false,
  "vip_info": {
    "is_vip": false,
    "rename_days": "60"
  },
  "is_realname": true
}
```

3. 用户收藏 `https://www.zhihu.com/api/v4/people/{userid}/collections`
```json
{
  "paging": {
    "is_end": true,
    "totals": 2,
    "previous": "https://www.zhihu.com/api/v4/people/9458e5ef909b70e40cae0c03fc103a4f/collections?limit=10&offset=0",
    "is_start": true,
    "next": "https://www.zhihu.com/api/v4/people/9458e5ef909b70e40cae0c03fc103a4f/collections?limit=10&offset=10"
  },
  "data": [
    {
      "view_count": 29,
      "description": "",
      "title": "20未读工具",
      "url": "https://api.zhihu.com/collections/206631503",
      "creator": {
        "is_followed": false,
        "badge": [],
        "name": "哎哎艾",
        "headline": "学生",
        "gender": 1,
        "user_type": "people",
        "url": "https://api.zhihu.com/people/9458e5ef909b70e40cae0c03fc103a4f",
        "avatar_url": "https://pic1.zhimg.com/50/v2-94172782210f57863cee78eab4f49168_l.jpg",
        "is_following": false,
        "type": "people",
        "id": "9458e5ef909b70e40cae0c03fc103a4f"
      },
      "answer_count": 75,
      "item_count": 75,
      "created_time": 1513318756,
      "comment_count": 0,
      "like_count": 0,
      "follower_count": 0,
      "is_public": true,
      "updated_time": 1594186185,
      "type": "collection",
      "id": 206631503
    },
    {
      "view_count": 27,
      "description": "",
      "title": "想做",
      "url": "https://api.zhihu.com/collections/300133584",
      "creator": {
        "is_followed": false,
        "badge": [],
        "name": "哎哎艾",
        "headline": "学生",
        "gender": 1,
        "user_type": "people",
        "url": "https://api.zhihu.com/people/9458e5ef909b70e40cae0c03fc103a4f",
        "avatar_url": "https://pic1.zhimg.com/50/v2-94172782210f57863cee78eab4f49168_l.jpg",
        "is_following": false,
        "type": "people",
        "id": "9458e5ef909b70e40cae0c03fc103a4f"
      },
      "answer_count": 24,
      "item_count": 24,
      "created_time": 1543671783,
      "comment_count": 0,
      "like_count": 0,
      "follower_count": 0,
      "is_public": true,
      "updated_time": 1594179016,
      "type": "collection",
      "id": 300133584
    }
  ]
}
```
4. 收藏夹信息 `https://api.zhihu.com/collections/{cid}`

```json
{
"status": 100,
"message": "",
"collection": {
"view_count": 27,
"is_liking": false,
"description": "",
"title": "想做",
"url": "https://api.zhihu.com/collections/300133584",
"creator": {
"is_followed": false,
"badge": [],
"name": "哎哎艾",
"headline": "学生",
"gender": 1,
"user_type": "people",
"url": "https://api.zhihu.com/people/9458e5ef909b70e40cae0c03fc103a4f",
"avatar_url": "https://pic2.zhimg.com/50/v2-94172782210f57863cee78eab4f49168_l.jpg",
"is_following": false,
"type": "people",
"id": "9458e5ef909b70e40cae0c03fc103a4f"
},
"answer_count": 24,
"item_count": 24,
"created_time": 1543671783,
"comment_count": 0,
"like_count": 0,
"is_following": false,
"follower_count": 0,
"is_public": true,
"updated_time": 1594179016,
"type": "collection",
"id": 300133584
}
}
```

5. 收藏夹中的回答摘要 `https://api.zhihu.com/collections/{cid}/answers`

```json

```

6. 关于具体的回答，似乎可以通过`https://zhihu.com/question/{qid}/{type}/{typeid}`访问对应回答