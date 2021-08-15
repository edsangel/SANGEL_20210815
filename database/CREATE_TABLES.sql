BEGIN;
  CREATE TABLE IF NOT EXISTS videos (
	  id CHAR(26) NOT NULL CHECK (CHAR_LENGTH(id) = 26) PRIMARY KEY,
	  fileid VARCHAR NOT NULL,
	  filename VARCHAR NOT NULL,
	  path VARCHAR NOT NULL,
    metadata JSON
	);
	CREATE UNIQUE INDEX videos_pkey ON videos USING btree (fileid);

  CREATE TABLE IF NOT EXISTS thumbnails (
    id CHAR(26) NOT NULL CHECK (CHAR_LENGTH(id) = 26) PRIMARY KEY,
    videoid VARCHAR NOT NULL,
    size VARCHAR NOT NULL,
    file BYTEA
  );
  CREATE UNIQUE INDEX thumbnails_pkey ON thumbnails USING btree (id);
  ALTER TABLE thumbnails ADD CONSTRAINT thumbnails_fk FOREIGN KEY (videoid) REFERENCES videos(fileid);

  CREATE TABLE IF NOT EXISTS category (
    id CHAR(26) NOT NULL CHECK (CHAR_LENGTH(id) = 26) PRIMARY KEY;
    name VARCHAR NOT NULL
  );
  CREATE UNIQUE INDEX category_pkey ON category USING btree (id);
  COMMIT;