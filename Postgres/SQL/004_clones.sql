CREATE TABLE IF NOT EXISTS clones (
	character_id BIGINT NOT NULL,
	jump_clone_id INTEGER NOT NULL,
	location_id BIGINT NOT NULL,
	location_type location_type NOT NULL,
	implants INTEGER[]
	name STRING,

	PRIMARY KEY (jump_clone_id, character_id)
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS clone_status (
	character_id BIGINT NOT NULL,
	home_location_id BIGINT NOT NULL,
	home_location_type location_type NOT NULL,
	last_clone_jump_date TIMESTAMP,
	last_station_change_date TIMESTAMP,
	implants INTEGER[],

	PRIMARY KEY (character_id)
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE

);
