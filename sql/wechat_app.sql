--
-- 表的结构 `video`
--

CREATE TABLE `video` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `video_title` longtext NOT NULL,
  `video_image` longtext NOT NULL,
  `video_url` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='视频列表表';

--
-- 转存表中的数据 `video`
--

INSERT INTO `video` (`video_title`, `video_image`, `video_url`) VALUES
('战神蚩尤', 'http://video-10066543.cos.myqcloud.com/220%20%287%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_22be5c0483e911e6b3901b16f8e86d88.f20.mp4'),
('热力追踪', 'http://video-10066543.cos.myqcloud.com/220%20%286%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_ef7a129883e811e6b3901b16f8e86d88.f20.mp4'),
('轩辕剑传奇', 'http://video-10066543.cos.myqcloud.com/220%20%285%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_be97398a83e811e6b3901b16f8e86d88.f20.mp4'),
('别有动机', 'http://video-10066543.cos.myqcloud.com/220%20%284%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_9a3a922683e811e6b3901b16f8e86d88.f20.mp4'),
('玩命速递', 'http://video-10066543.cos.myqcloud.com/220%20%283%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_7095483083e811e6b3901b16f8e86d88.f20.mp4'),
('移动迷宫2', 'http://video-10066543.cos.myqcloud.com/220%20%282%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_381007ac83e811e6b3901b16f8e86d88.f20.mp4'),
('火星救援', 'http://video-10066543.cos.myqcloud.com/220%20%281%29.jpg', 'http://200028891.vod.myqcloud.com/200028891_07962e1c83e811e6b3901b16f8e86d88.f20.mp4'),
('全力扣杀', 'http://video-10066543.cos.myqcloud.com/220.jpg', 'http://200028891.vod.myqcloud.com/200028891_521183ac83e711e6a50ea702d3f6feb0.f20.mp4');


CREATE TABLE `comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `vid` INT UNSIGNED NOT NULL,
  `nick` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
