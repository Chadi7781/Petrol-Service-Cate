package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
