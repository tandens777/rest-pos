CREATE TABLE FOOD_STATION (
    station_id INTEGER NOT NULL PRIMARY KEY,
    station_code VARCHAR(50) NOT NULL,
    station_nm VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX idx_food_station_food_station_nm ON food_station(station_nm);
CREATE UNIQUE INDEX idx_food_station_food_station_code ON food_station(station_code);

GRANT SELECT, UPDATE, INSERT, DELETE ON food_station TO public;

