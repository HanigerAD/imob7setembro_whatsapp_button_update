ALTER TABLE agenciador
ADD flag_visivel_site  BOOLEAN DEFAULT TRUE;

UPDATE agenciador SET flag_visivel_site = FALSE WHERE nome LIKE '%Imobiliária 7 Setembro%'

-- SELECT * FROM agenciador