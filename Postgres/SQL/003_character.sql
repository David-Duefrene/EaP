CREATE TABLE character (
    name TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    character_id BIGINT UNIQUE,

	PRIMARY KEY (name, character_id)
);

CREATE TABLE character_sheet (
    character_id BIGINT PRIMARY KEY,
    alliance_id INTEGER,
    birthday TIMESTAMP(3) NOT NULL,
    bloodline_id INTEGER NOT NULL,
    corporation_id INTEGER NOT NULL,

    description TEXT,
    faction_id INTEGER,
    gender gender NOT NULL,
    name TEXT UNIQUE NOT NULL,
    race_id INTEGER NOT NULL,
    security_status DOUBLE PRECISION NOT NULL DEFAULT 0,
    title TEXT,

	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_bloodline_id FOREIGN KEY (bloodline_id) REFERENCES bloodlines(bloodline_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT fk_race_id FOREIGN KEY (race_id) REFERENCES races(race_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE agent_research (
	character_id BIGINT,
    agent_id INTEGER NOT NULL,
    points_per_day DOUBLE PRECISION NOT NULL,
    remainder_points DOUBLE PRECISION NOT NULL,
    skill_type_id INTEGER NOT NULL,
    started_at TEXT NOT NULL,

	PRIMARY KEY (character_id, agent_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE blueprint (
    item_id BIGINT NOT NULL UNIQUE,
    character_id BIGINT NOT NULL,
    location_flag location_flag NOT NULL,
    location_id BIGINT NOT NULL,
    material_efficiency INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    runs INTEGER NOT NULL,
    time_efficiency INTEGER NOT NULL,
    type_id INTEGER NOT NULL,

    PRIMARY KEY (item_id, character_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE corporation_history (
    character_id BIGINT NOT NULL,
    corporation_id INTEGER NOT NULL,
    record_id INTEGER PRIMARY KEY,
    start_date TIMESTAMP(3) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,

	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE fatigue (
    character_id BIGINT PRIMARY KEY ,
    last_jump_date TIMESTAMP(3) NOT NULL,
    last_update_date TIMESTAMP(3) NOT NULL,
    jump_fatigue_expire_date TIMESTAMP(3) NOT NULL,

	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE medal (
    character_id BIGINT NOT NULL,
    corporation_id INTEGER NOT NULL,
    date TIMESTAMP(3) NOT NULL,
    description TEXT NOT NULL,
    graphics TEXT NOT NULL,
    issuer_id INTEGER NOT NULL,
    medal_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status privacy_status NOT NULL,
    title TEXT NOT NULL,

	PRIMARY KEY (character_id, medal_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notification (
    character_id BIGINT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    notification_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    sender_type sender_type NOT NULL,
    text TEXT,
    timestamp TIMESTAMP(3) NOT NULL,
    type message_type NOT NULL,

	PRIMARY KEY (character_id, notification_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE contact_notification (
    character_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    notification_id INTEGER,
    send_date TIMESTAMP(3) NOT NULL,
    sender_character_id INTEGER NOT NULL,
    standing_level DOUBLE PRECISION NOT NULL,

	PRIMARY KEY (character_id, notification_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE corp_roles (
    character_id BIGINT PRIMARY KEY,
    roles corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    roles_at_base corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    roles_at_hq corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    roles_at_other corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],

	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE standings (
    character_id BIGINT NOT NULL,
    from_id INTEGER NOT NULL,
    from_type npc_standing_type NOT NULL,
    standing DOUBLE PRECISION NOT NULL,

    PRIMARY KEY (character_id, from_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE title (
    character_id BIGINT NOT NULL REFERENCES character(character_id),
    title_id INTEGER NOT NULL,
    name TEXT NOT NULL,

	PRIMARY KEY (character_id, title_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);
