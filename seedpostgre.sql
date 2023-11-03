ALTER SEQUENCE achievement_tbl_achievement_id_seq RESTART WITH 1;
ALTER SEQUENCE category_tbl_category_id_seq RESTART WITH 1;
ALTER SEQUENCE faq_tbl_faq_id_seq RESTART WITH 1;
ALTER SEQUENCE favorite_category_tbl_favorite_category_id_seq RESTART WITH 1;
ALTER SEQUENCE feedback_tbl_feedback_id_seq RESTART WITH 1;
ALTER SEQUENCE gem_tbl_gem_id_seq RESTART WITH 1;
ALTER SEQUENCE post_question_tbl_post_question_id_seq RESTART WITH 1;
ALTER SEQUENCE post_tbl_post_id_seq RESTART WITH 8;
ALTER SEQUENCE question_tbl_question_id_seq RESTART WITH 1;
ALTER SEQUENCE reward_tbl_reward_id_seq RESTART WITH 1;
ALTER SEQUENCE tag_post_tbl_tag_post_id_seq RESTART WITH 1;
ALTER SEQUENCE tag_tbl_tag_id_seq RESTART WITH 1;
ALTER SEQUENCE user_achievement_tbl_user_achievement_id_seq RESTART WITH 1;
ALTER SEQUENCE user_level_tbl_user_level_id_seq RESTART WITH 1;
ALTER SEQUENCE user_post_tbl_user_post_id_seq RESTART WITH 1;
ALTER SEQUENCE user_tbl_user_id_seq RESTART WITH 16;
ALTER SEQUENCE user_role_tbl_user_role_id_seq RESTART WITH 16;
ALTER SEQUENCE verify_email_tbl_verify_email_id_seq RESTART WITH 1;
-- ALTER SEQUENCE role_tbl_id_seq RESTART WITH 1;
-- TRUNCATE user_tbl RESTART IDENTITY CASCADE;
-- TRUNCATE reward_tbl RESTART IDENTITY CASCADE;
-- TRUNCATE category_tbl RESTART IDENTITY CASCADE;
-- TRUNCATE faq_tbl RESTART IDENTITY CASCADE;
-- TRUNCATE tag_tbl RESTART IDENTITY CASCADE;

-- Insert data into Tag table

-- INSERT INTO role_tbl ("name") VALUES
-- ('ROLE_ADMIN'),('ROLE_USER'),('ROLE_TEACHER');

-- Insert data into User table
DO $$ 
DECLARE 
    RecordNumber INT := 1; email VARCHAR(100); name VARCHAR(10);
    date TIMESTAMP;dob TIMESTAMP;
    count INT;littleEmail VARCHAR(10);
BEGIN
    WHILE (RecordNumber <= 30) LOOP
        count := 1;  littleEmail := '';
        WHILE (count <= 10) LOOP
            littleEmail := littleEmail || CHR(FLOOR(RANDOM() * (122 - 97 + 1) + 97)::INT);
            count := count + 1;
        END LOOP;
        email := littleEmail || '@gmail.com';
        name := CHR(FLOOR(RANDOM() * (90 - 65 + 1) + 65)::INT) 	|| 
				CHR(FLOOR(RANDOM() * (122 - 97 + 1) + 97)::INT) || 
				CHR(FLOOR(RANDOM() * (122 - 97 + 1) + 97)::INT) ||
				CHR(32)											||
				CHR(FLOOR(RANDOM() * (90 - 65 + 1) + 65)::INT) 	|| 
				CHR(FLOOR(RANDOM() * (122 - 97 + 1) + 97)::INT) || 
				CHR(FLOOR(RANDOM() * (122 - 97 + 1) + 97)::INT);
        
        -- Generate a random number of days between 0 and 5475 (15 years) and add it to the base date
        date := '2008-11-11'::DATE + (RANDOM() * 5475)::INTEGER;
        dob := '1960-01-01'::DATE + (RANDOM() * 21916)::INTEGER; -- 60 years
        
        -- Execute the INSERT INTO statement directly
        INSERT INTO user_tbl (email, name, avatar, "password", Is_Active, date_of_birth, Created_At)
        VALUES (email, name, 'Avatar', 'Password', TRUE, dob, date);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
--Insert data into User Role table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
	userRoleId INT :=16; role INT;
BEGIN
    WHILE (RecordNumber <= 30) LOOP
	 	role := FLOOR(RANDOM() * 3 + 1)::INT;
		INSERT INTO user_role_tbl (user_id,role_id)
        VALUES (userRoleId,role);
        userRoleId := userRoleId+1;
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
-- Insert data into Category table
INSERT INTO Category_tbl (Category_Name) VALUES
('Uncategory'),('Physic'),('Chemistry'),('Maths'),('Biology'),('Informatics'),('Literature'),('History');
-- Insert data into Tag table
INSERT INTO Tag_tbl (Tag_Name) VALUES
('basic'),('advance'),('technology'),('common knowledge'),('expertise knowledge'),
('analytical skills'),('natural'),('cultural'),('social');
-- Insert data into Reward table
INSERT INTO Reward_tbl (Badge) VALUES
('badge 01'),('badge 02'),('badge 03'),
('badge 04'),('badge 05'),('badge 06'),
('badge 07'),('badge 08'),('badge 09');
-- Insert data into Achievement table
INSERT INTO Achievement_tbl (Reward_id, Title, Score) VALUES
(1,'Fresher',100),(2,'Junior',300),(3,'Senior',1000),
(4,'Farmer Bronze',100),(5,'Farmer Silver',300),(6,'Farmer Gold',1000),
(7,'Spendthrift Bronze',100),(8,'Spendthrift Silver',300),(9,'Spendthrift Gold',1000);

-- Insert data into question table
DO $$ 
DECLARE 
	RecordNumber INT := 1;
    chars TEXT := 'abc def ghi jk lmn opqr stu vwx yz ABC DE FGH IJK LMN OP QRS TUV WX YZ';
	content TEXT;
	author INT;
	answer_a VARCHAR(100);answer_b VARCHAR(100);answer_c VARCHAR(100);answer_d VARCHAR(100);right_answer VARCHAR(1);
BEGIN
    WHILE (RecordNumber <= 200) LOOP
		author := (FLOOR(RANDOM() * 30)+1)::INT;
        content := '';
        FOR i IN 1..100 LOOP
            content := content || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
        
        answer_a := 'Answer A ' || RecordNumber;
        answer_b := 'Answer B ' || RecordNumber;
        answer_c := 'Answer C ' || RecordNumber;
        answer_d := 'Answer D ' || RecordNumber;
        
		right_answer := CASE FLOOR(RANDOM() * 4 + 1)::INT
            WHEN 1 THEN 'A'
            WHEN 2 THEN 'B'
			WHEN 3 THEN 'C'
            ELSE 'D'
        END;
        
        INSERT INTO question_tbl ("content", answer_a,answer_b,answer_c,answer_d, right_answer,author)
        VALUES (content, answer_a, answer_b, answer_c, answer_d,right_answer, author);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
-- Insert data into Post table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
    author_id INT;
    category_id INT;
    price INT;
    prize INT;
    title VARCHAR(255);
    content TEXT;
    type VARCHAR(100);
    date TIMESTAMP;
    chars TEXT := 'abc def ghi jk lmn opqr stu vwx yz ABC DE FGH IJK LMN OP QRS TUV WX YZ';
	q_id BIGINT;
	--feedback
	comment VARCHAR(1000);commenter INT;
BEGIN
    WHILE (RecordNumber <= 200) LOOP
        author_id := (FLOOR(RANDOM() * 30+1))::INT; -- Assuming author IDs are between 1 and 100
        category_id := (FLOOR(RANDOM() * 8+1))::INT; -- Assuming category IDs are between 1 and 8
        price := (RANDOM() * 1000)::INT;
        prize := (RANDOM() * 500)::INT;
        title := 'Random Title ' || RecordNumber;
        -- Generate a random string for post_content with 500 characters
        content := '';
        FOR i IN 1..255 LOOP
            content := content || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
        type := CASE FLOOR(RANDOM() * 2)::INT
            WHEN 0 THEN 'lesson'
            ELSE 'test'
        END;
        -- Generate a random number of days between 0 and 5475 (15 years) and add it to the base date
        date := '2008-11-11'::DATE + (RANDOM() * 5475)::INTEGER;
		 -- Execute the INSERT INTO statement directly into Post_tbl
        INSERT INTO Post_tbl (author, category_id, feature_image, video, price, prize, title, "content", "type", created_at)
        VALUES (author_id, category_id, 'Image', 'Video', price, prize, title, content, type, date);
		
		-- Create 5 questions each post
			FOR i IN 1..5 LOOP
				q_id := (FLOOR(RANDOM() * 200+1))::INT;
				
				INSERT INTO post_question_tbl (post_id,question_id)
				VALUES (RecordNumber,q_id);
			END LOOP;
		-- Create 5 feedbacks each post
			FOR i IN 1..5 LOOP
				q_id := (FLOOR(RANDOM() * 200+1))::INT;
				commenter := (FLOOR(RANDOM() * 30+1))::INT;
				comment := '';
					FOR i IN 1..30 LOOP
						comment := comment || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
					END LOOP;
				INSERT INTO feedback_tbl (post_id,user_id,"content",created_at)
				VALUES (RecordNumber,commenter,comment,date);
			END LOOP;

        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;

-- Insert data into Tag Post table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
    t_id INT; p_id INT;
BEGIN
    WHILE (RecordNumber <= 200) LOOP
        t_id := (FLOOR(RANDOM() * 9+1))::INT; 
        p_id := (FLOOR(RANDOM() * 200+1))::INT;
        
        INSERT INTO tag_post_tbl(tag_id, post_id)
        VALUES (t_id, p_id);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
-- Insert data into User Post table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
    u_id INT;
    p_id INT;
    is_pass BOOLEAN;
    date TIMESTAMP;
BEGIN
    WHILE (RecordNumber <= 400) LOOP
        u_id := (FLOOR(RANDOM() * 30+1))::INT; 
        p_id := (FLOOR(RANDOM() * 200+1))::INT;
        is_pass := (RANDOM() <0.5);
        date := '2010-01-01'::DATE + (RANDOM() * 4745)::INTEGER;
        
        INSERT INTO user_post_tbl(user_id, post_id, is_pass, created_at)
        VALUES (u_id, p_id,is_pass, date);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
INSERT INTO faq_tbl (question, asked)
VALUES
  ('How do I purchase a course?', 'To purchase a course, first, log in to your account. Then, browse the courses, select the one you want, and click the "Buy Now" button. Follow the instructions to complete the payment.'),
  ('Can I get a refund if I''m not satisfied with a course?', 'Yes, we offer a 30-day money-back guarantee. If you''re not satisfied with a course, contact our support team within 30 days of purchase, and we''ll process your refund.'),
  ('How can I become a course instructor?', 'To become a course instructor, go to your profile settings and click "Become an Instructor." Follow the steps to create and publish your courses.'),
  ('Can I enroll in multiple courses at once?', 'Yes, you can enroll in multiple courses simultaneously. Your enrolled courses will be listed in your dashboard.'),
  ('Is there a mobile app available?', 'Yes, we have a mobile app available for iOS and Android devices. You can download it from the App Store or Google Play.'),
  ('Do you offer certificates upon course completion?', 'Yes, most of our courses offer certificates of completion. Check the course details for certificate availability.');
  
-- Insert data into gem table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
	u_id INT; current INT; earned INT; spent INT;
    date TIMESTAMP;
BEGIN
    WHILE (RecordNumber <= 30) LOOP
        u_id := RecordNumber; 
        current := (FLOOR(RANDOM() * 1000+1))::INT;
        earned := (FLOOR(RANDOM() * 10000+1))::INT;
		spent := (FLOOR(RANDOM() * 10000+1))::INT;
        
        INSERT INTO gem_tbl (user_id,"current",earned,spent )
        VALUES (u_id, current, earned, spent);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
-- Insert data into user achievement table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
	u_id INT; a_id INT; process NUMERIC; is_received_badge BOOLEAN;
BEGIN
    WHILE (RecordNumber <= 30) LOOP
        u_id := RecordNumber; 
        a_id := (FLOOR(RANDOM() * 9+1))::INT;
        process := (RANDOM() * 1500);
		is_received_badge := (RANDOM()<0.5)::BOOLEAN;
        
        INSERT INTO user_achievement_tbl (user_id,achievement_id,process,is_received_badge)
        VALUES (u_id,a_id,process,is_received_badge);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;
-- Insert data into user level table
DO $$ 
DECLARE 
    RecordNumber INT := 1; 
	u_id INT; level INT; exp INT;
BEGIN
    WHILE (RecordNumber <= 30) LOOP
        u_id := RecordNumber; 
        level := (FLOOR(RANDOM() * 100))::INT;
        exp := level*100+ FLOOR(RANDOM()*100)::INT;
        
        INSERT INTO user_level_tbl (user_id,"level",exp)
        VALUES (u_id,level,exp);
        
        RecordNumber := RecordNumber + 1;
    END LOOP;
END $$;