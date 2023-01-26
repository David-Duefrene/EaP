CREATE OR REPLACE VIEW get_blueprints AS
	SELECT
		item_id,
		character_id,
		location_flag,
		location_id,
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
		location_id,
		location_type,
		implants,
		clones.name,
		structure.name AS location_name,
		structure.owner_id AS location_owner_id
	FROM clones
	JOIN structure ON structure.structure_id = clones.location_id
