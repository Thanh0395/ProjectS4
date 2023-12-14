select u.user_id, u."name",u.email, u.avatar,
		count(Distinct p.post_id) as countLesson
from user_tbl as u
join post_tbl p ON p.author = u.user_id 
where p.deleted_at ISNULL AND p."type" = 'lesson' 
GROUP by u.user_id
ORDER by countLesson DESC

SELECT 
    u.user_id, 
    u."name", 
    u.email, 
    u.avatar,
    COUNT(DISTINCT p.post_id) AS countLesson, 
    SUM(CASE WHEN p."type" = 'lesson' THEN 1 ELSE 0 END) AS soldLesson,
    SUM(COUNT(DISTINCT p.post_id)) OVER () AS sumPosts,
    SUM(CASE WHEN p."type" = 'lesson' THEN COUNT(DISTINCT up.user_post_id) ELSE 0 END) OVER () AS sumUserPosts
FROM 
    user_tbl AS u
JOIN 
    post_tbl p ON p.author = u.user_id 
INNER JOIN 
    user_post_tbl up ON up.user_id = u.user_id
WHERE 
    p.deleted_at IS NULL 
    AND p."type" = 'lesson' 
    AND (up.is_refunded IS NOT TRUE OR up.is_refunded IS NULL)
GROUP BY u.user_id, p.type
ORDER BY 
    countLesson DESC;


--cai nay dung 1/2
SELECT 
    u.user_id,
    u."name" AS author_name,
    p.post_id,
    p.title AS post_title,
    COUNT(DISTINCT up.user_post_id) AS countBuyers
FROM 
    user_tbl u
JOIN 
    post_tbl p ON p.author = u.user_id
LEFT JOIN 
    user_post_tbl up ON up.post_id = p.post_id
WHERE 
    p.type = 'lesson'
GROUP BY 
    u.user_id, u."name", p.post_id, p.title
ORDER BY 
    u.user_id;
----------dung roi
SELECT 
    u.user_id,
    u."name" AS author_name,
    COUNT(DISTINCT p.post_id) AS countTotalPosts,
    SUM(countBuyers) AS sumCountBuyers
FROM 
    user_tbl u
JOIN 
    post_tbl p ON p.author = u.user_id
LEFT JOIN (
    SELECT 
        up.post_id,
        COUNT(DISTINCT up.user_post_id) AS countBuyers
    FROM 
        user_post_tbl up
    GROUP BY 
        up.post_id
) up ON up.post_id = p.post_id
WHERE 
    p.type = 'lesson'
GROUP BY 
    u.user_id, u."name"
ORDER BY 
    u.user_id;
----------------------

select * from user_post_tbl up JOIN post_tbl p ON p.post_id = up.post_id where p.author=1 and p."type" ='lesson'

select u.user_id, u."name",u.email, u.avatar, p."type",
		count(Distinct p.post_id) as countLesson, 
		count(Distinct up.user_post_id) AS soldLesson,
-- 		count(distinct p.category_id),
		SUM(COUNT(Distinct p.post_id)) OVER () AS sumPosts,
		SUM(COUNT(Distinct up.user_post_id)) OVER () AS sumUserPosts
from user_tbl as u
join post_tbl p ON p.author = u.user_id 
join user_post_tbl up ON up.user_id = u.user_id
where p.deleted_at ISNULL AND p."type" = 'lesson' 
AND (up.is_refunded=false OR up.is_refunded ISNULL)
GROUP by u.user_id , p."type"
ORDER by countLesson DESC

-- select count(p.category_id) as countCate , 
-- 		c.category_name, c.category_id , u.user_id,u."name" from post_tbl p 
-- join user_tbl u ON u.user_id = p.author
-- join category_tbl c ON c.category_id = p.category_id
-- where u.user_id=1
-- GROUP by (u.user_id, c.category_id) order by countcate desc 
-- Limit 1;


-- WITH UserCounts AS (
--     SELECT
--         u.user_id,
--         COUNT(DISTINCT p.post_id) AS countLesson,
--         COUNT(DISTINCT up.user_post_id) AS countUserPosts,
--         COUNT(DISTINCT p.category_id) AS countCategories,
--         SUM(COUNT(DISTINCT p.post_id)) OVER () AS sumPosts,
--         SUM(COUNT(DISTINCT up.user_post_id)) OVER () AS sumUserPosts
--     FROM
--         user_tbl u
--     JOIN
--         post_tbl p ON p.author = u.user_id
--     JOIN
--         user_post_tbl up ON up.user_id = u.user_id
--     GROUP BY
--         u.user_id
-- )

-- SELECT
--     u.user_id,
--     u."name",
--     u.email,
--     u.avatar,
--     uc.countLesson,
--     uc.countUserPosts,
--     uc.countCategories,
--     uc.sumPosts,
--     uc.sumUserPosts,
--     countCate.countCate,
--     countCate.category_name,
--     countCate.category_id
-- FROM
--     user_tbl u
-- JOIN
--     UserCounts uc ON uc.user_id = u.user_id
-- LEFT JOIN (
--     SELECT
--         COUNT(p.category_id) AS countCate,
--         c.category_name,
--         c.category_id,
--         u.user_id
--     FROM
--         post_tbl p
--     JOIN
--         user_tbl u ON u.user_id = p.author
--     JOIN
--         category_tbl c ON c.category_id = p.category_id
--     WHERE
--         u.user_id = 1
--     GROUP BY
--         u.user_id, c.category_id
--     ORDER BY
--         countCate DESC
--     LIMIT 1
-- ) countCate ON countCate.user_id = u.user_id
-- ORDER BY
--     uc.countLesson DESC;