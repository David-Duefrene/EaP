CREATE OR REPLACE VIEW get_blueprints AS
	SELECT
		item_id,
		character_id,
		location_flag,
		material_efficiency,
		quantity,
		runs,
		time_efficiency,
		blueprint.type_id,
		structure.name AS location_name,
		structure.owner_id AS location_owner_id
	FROM blueprint
	JOIN structure ON structure.structure_id = blueprint.location_id;


CREATE OR REPLACE VIEW get_clones AS
	SELECT
		character_id,
		jump_clone_id,
		location_type,
		implants,
		clones.name,
		structure.name AS location_name,
		structure.owner_id AS location_owner_id
	FROM clones
	JOIN structure ON structure.structure_id = clones.location_id;

CREATE OR REPLACE VIEW get_all_characters AS
	SELECT
		character_sheet.character_id,
		character_sheet.birthday,
		character_sheet.description,
		character_sheet.gender,
		character_sheet.name,
		character_sheet.security_status,
		character_sheet.title,
		bloodlines.name AS bloodline_name,
		bloodlines.description AS bloodline_description,
		races.name AS race_name,
		races.description AS race_description,
		corporation.name AS corporation,
		alliance.name AS alliance

	FROM character_sheet
		JOIN bloodlines ON character_sheet.bloodline_id = bloodlines.bloodline_id
		JOIN races ON character_sheet.race_id = races.race_id
		JOIN corporation ON character_sheet.corporation_id = corporation.corporation_id
		LEFT JOIN alliance ON character_sheet.alliance_id = alliance.alliance_id;

CREATE OR REPLACE VIEW get_character_sheet AS
	SELECT
		character_sheet.character_id,
		character_sheet.birthday,
		character_sheet.description,
		character_sheet.gender,
		character_sheet.name,
		character_sheet.security_status,
		character_sheet.title,
		bloodlines.name AS bloodline_name,
		bloodlines.description AS bloodline_description,
		races.name AS race_name,
		races.description AS race_description,
		title.name AS title_name,
		corporation.name AS corporation,
		alliance.name AS alliance

	FROM character_sheet
		JOIN bloodlines ON character_sheet.bloodline_id = bloodlines.bloodline_id
		JOIN races ON character_sheet.race_id = races.race_id
		JOIN corporation ON character_sheet.corporation_id = corporation.corporation_id
		LEFT JOIN title ON character_sheet.character_id = title.character_id
		LEFT JOIN alliance ON character_sheet.alliance_id = alliance.alliance_id;
