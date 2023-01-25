CREATE TABLE IF NOT EXISTS clones (
	character_id BIGINT NOT NULL,
	jump_clone_id INTEGER NOT NULL,
	location_id BIGINT NOT NULL,
	location_type location_type NOT NULL,
	implants INTEGER[],
	name TEXT,

	PRIMARY KEY (jump_clone_id, character_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES structure(structure_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS clone_status (
	character_id BIGINT NOT NULL,
	home_location_id BIGINT NOT NULL,
	home_location_type location_type NOT NULL,
	last_clone_jump_date TIMESTAMP,
	last_station_change_date TIMESTAMP,
	implants INTEGER[],

	PRIMARY KEY (character_id),
	CONSTRAINT fk_char_id FOREIGN KEY (character_id) REFERENCES character(character_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_home_location_id FOREIGN KEY (home_location_id) REFERENCES structure(structure_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE OR REPLACE VIEW get_clones AS
	SELECT
		character_id,
		jump_clone_id,
		location_id,
		location_type,
		implants,
		clones.name,
		structure.name AS location_name,
		structure.owner_id AS location_owner_id
	FROM clones
	JOIN structure ON structure.structure_id = clones.location_id
