package chapter5.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class JdbcRantDao {
	private static final String INSERT_QUERY =
		"insert into destinations (id, url, description, badge_url, token) values(3, ?, ?, ?, ?)";
	
	private static final String UPDATE_QUERY =
		"UPDATE destinations SET token = 'updated value' WHERE id = 3";
	
	private static final String SELECT_QUERY =
		"select token from destinations";
	
	private static final String SELECT_BY_ID_QUERY =
		SELECT_QUERY + " where id=?";
	
	private JdbcTemplate jdbcTemplate;
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public void addDestinationl() {
		jdbcTemplate.update(INSERT_QUERY, 
			new Object[] { "http://localhost", "desc1", "http://badge_local", "no matter" } );
	}
	
	public void updateDestination(long id) {
		jdbcTemplate.update(UPDATE_QUERY, 
			new Object[] {} );
	}
	
	public String getDestinationToken(long id) {
		List matches = jdbcTemplate.query(SELECT_BY_ID_QUERY,
			new Object[] { Long.valueOf(id) },
			new RowMapper() {
				public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException, DataAccessException {
					return rs.getString(1);
				}
		});
		
		return matches.size() > 0 ? (String) matches.get(0) : null;
	}
	
	public void deleteDestination(long id) {
		jdbcTemplate.execute("DELETE FROM destinations WHERE id=3");
	}
}