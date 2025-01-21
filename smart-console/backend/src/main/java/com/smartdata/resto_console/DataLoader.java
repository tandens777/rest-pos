package com.smartdata.resto_console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.model.Role;
import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.repository.RoleRepository;
import com.smartdata.resto_console.repository.UserRepository;

import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        createAdminRole();
        createSupervisorRole();
        createManagerRole();
        createWaiterRole();
        createCashierRole();
        createKitchen1Role();
        createKitchen2Role();
        createKitchen3Role();
        createBarRole();

        createAdminUser();
        createSupervisorUser();
        createManagerUser();
        createWaiterUser();
        createCashierUser();
        createKitchen1User();
        createKitchen2User();
        createKitchen3User();
        createBarUser();
    }
        

    private void createAdminRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("ADMIN"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            roleRepository.save(adminRole);
            System.out.println("Admin role created.");
        } else {
            System.out.println("Admin role already exists: " + existingRole.get());
        }
    }
    private void createSupervisorRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("SUPERVISOR"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("SUPERVISOR");
            roleRepository.save(adminRole);
            System.out.println("Supervisor role created.");
        } else {
            System.out.println("Supervisor role already exists: " + existingRole.get());
        }
    }
    private void createManagerRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("MANAGER"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("MANAGER");
            roleRepository.save(adminRole);
            System.out.println("manager role created.");
        } else {
            System.out.println("manager role already exists: " + existingRole.get());
        }
    }
    private void createWaiterRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("WAITER"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("WAITER");
            roleRepository.save(adminRole);
            System.out.println("Waiter role created.");
        } else {
            System.out.println("Waiter role already exists: " + existingRole.get());
        }
    }
    private void createCashierRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("CASHIER"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("CASHIER");
            roleRepository.save(adminRole);
            System.out.println("Cashier role created.");
        } else {
            System.out.println("Cashier role already exists: " + existingRole.get());
        }
    }
    private void createBarRole() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("BAR"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("BAR");
            roleRepository.save(adminRole);
            System.out.println("Bar role created.");
        } else {
            System.out.println("Bar role already exists: " + existingRole.get());
        }
    }
    private void createKitchen1Role() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("KITCHEN1"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("KITCHEN1");
            roleRepository.save(adminRole);
            System.out.println("Kitchen1 role created.");
        } else {
            System.out.println("Kitchen1 role already exists: " + existingRole.get());
        }
    }
    private void createKitchen2Role() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("KITCHEN2"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("KITCHEN2");
            roleRepository.save(adminRole);
            System.out.println("Kitchen2 role created.");
        } else {
            System.out.println("Kitchen2 role already exists: " + existingRole.get());
        }
    }
    private void createKitchen3Role() {
        // Check and create the ADMIN role if it doesn't exist
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByName("KITCHEN3"));
        if (existingRole.isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("KITCHEN3");
            roleRepository.save(adminRole);
            System.out.println("Kitchen3 role created.");
        } else {
            System.out.println("Kitchen3 role already exists: " + existingRole.get());
        }
    }


    private void createAdminUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("admin");
        if (existingUser.isEmpty()) {
            System.out.println("Admin user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("ADMIN");
            if (adminRole == null) {
                throw new IllegalStateException("ADMIN role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("080888"));
            System.out.println("Encoded password for admin: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Admin user created with username: admin and password: 080888");
        } else {
            System.out.println("Admin user already exists: " + existingUser.get());
        }
    }
    
    private void createSupervisorUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("supervisor");
        if (existingUser.isEmpty()) {
            System.out.println("Supervisor user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("SUPERVISOR");
            if (adminRole == null) {
                throw new IllegalStateException("Supervisor role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("supervisor");
            adminUser.setPassword(passwordEncoder.encode("000000"));
            System.out.println("Encoded password for supervisor: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Supervisor user created");
        } else {
            System.out.println("Supervisor user already exists: " + existingUser.get());
        }
    }

    private void createManagerUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("manager");
        if (existingUser.isEmpty()) {
            System.out.println("Manager user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("MANAGER");
            if (adminRole == null) {
                throw new IllegalStateException("Manager role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("manager");
            adminUser.setPassword(passwordEncoder.encode("345678"));
            System.out.println("Encoded password for manager: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Manager user created");
        } else {
            System.out.println("Manager user already exists: " + existingUser.get());
        }
    }

    private void createWaiterUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("waiter");
        if (existingUser.isEmpty()) {
            System.out.println("Waiter user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("WAITER");
            if (adminRole == null) {
                throw new IllegalStateException("Waiter role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("waiter");
            adminUser.setPassword(passwordEncoder.encode("111111"));
            System.out.println("Encoded password for waiter: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Waiter user created");
        } else {
            System.out.println("Waiter user already exists: " + existingUser.get());
        }
    }

    private void createCashierUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("cashier");
        if (existingUser.isEmpty()) {
            System.out.println("Cashier user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("CASHIER");
            if (adminRole == null) {
                throw new IllegalStateException("Cashier role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("cashier");
            adminUser.setPassword(passwordEncoder.encode("222222"));
            System.out.println("Encoded password for cashier: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Cashier user created");
        } else {
            System.out.println("Cashier user already exists: " + existingUser.get());
        }
    }

    private void createKitchen1User() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("kitchen1");
        if (existingUser.isEmpty()) {
            System.out.println("Kitchen1 user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("KITCHEN1");
            if (adminRole == null) {
                throw new IllegalStateException("KITCHEN1 role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("kitchen1");
            adminUser.setPassword(passwordEncoder.encode("333331"));
            System.out.println("Encoded password for kitchen1: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Kitchen1 user created");
        } else {
            System.out.println("Kitchen1 user already exists: " + existingUser.get());
        }
    }
    private void createKitchen2User() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("kitchen2");
        if (existingUser.isEmpty()) {
            System.out.println("Kitchen2 user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("KITCHEN2");
            if (adminRole == null) {
                throw new IllegalStateException("KITCHEN2 role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("kitchen2");
            adminUser.setPassword(passwordEncoder.encode("333332"));
            System.out.println("Encoded password for kitchen2: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Kitchen2 user created");
        } else {
            System.out.println("Kitchen2 user already exists: " + existingUser.get());
        }
    }
    private void createKitchen3User() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("kitchen3");
        if (existingUser.isEmpty()) {
            System.out.println("Kitchen3 user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("KITCHEN3");
            if (adminRole == null) {
                throw new IllegalStateException("KITCHEN3 role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("kitchen3");
            adminUser.setPassword(passwordEncoder.encode("333333"));
            System.out.println("Encoded password for kitchen3: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Kitchen3 user created");
        } else {
            System.out.println("Kitchen3 user already exists: " + existingUser.get());
        }
    }


    private void createBarUser() {
        // Check and create the admin user if it doesn't exist
        Optional<User> existingUser = userRepository.findByUsername("bar");
        if (existingUser.isEmpty()) {
            System.out.println("Bar user does not exist. Creating...");
    
            // Retrieve the ADMIN role
            Role adminRole = roleRepository.findByName("BAR");
            if (adminRole == null) {
                throw new IllegalStateException("BAR role is not created. Please check the role setup.");
            }
    
            User adminUser = new User();
            adminUser.setUsername("bar");
            adminUser.setPassword(passwordEncoder.encode("555555"));
            System.out.println("Encoded password for bar: " + adminUser.getPassword());
    
            // Assign the ADMIN role to the admin user
            adminUser.setRole(adminRole);
    
            // Save the admin user
            userRepository.save(adminUser);
            System.out.println("Bar user created");
        } else {
            System.out.println("Bar user already exists: " + existingUser.get());
        }
    }


}
