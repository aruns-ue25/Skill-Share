package com.skillshare.skillshare.controller.web;

import com.skillshare.skillshare.dto.user.UserProfileDTO;
import com.skillshare.skillshare.security.CustomUserDetails;
import com.skillshare.skillshare.service.skill.SkillService;
import com.skillshare.skillshare.service.user.UserProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserProfileService userProfileService;

    @MockBean
    private SkillService skillService;

    private CustomUserDetails mockUserDetails;

    @BeforeEach
    void setUp() {
        mockUserDetails = mock(CustomUserDetails.class, org.mockito.Answers.RETURNS_DEEP_STUBS);
        when(mockUserDetails.getUser().getId()).thenReturn(1L);

        UserProfileDTO profileDTO = new UserProfileDTO();
        profileDTO.setFullName("Test User");
        profileDTO.setBio("Test Bio");
        profileDTO.setMainSkillIds(new ArrayList<>());

        when(userProfileService.getProfileByUserId(anyLong())).thenReturn(profileDTO);
    }

    @Test
    void testShowProfile() throws Exception {
        mockMvc.perform(get("/profile").with(user(mockUserDetails)))
                .andExpect(status().isOk())
                .andExpect(view().name("profile-view"))
                .andExpect(model().attributeExists("profile"))
                .andExpect(model().attributeExists("mainSkills"));
    }

    @Test
    void testShowEditForm() throws Exception {
        mockMvc.perform(get("/profile/edit").with(user(mockUserDetails)))
                .andExpect(status().isOk())
                .andExpect(view().name("profile-edit"))
                .andExpect(model().attributeExists("profileUpdateDTO"))
                .andExpect(model().attributeExists("allSkills"));
    }

    @Test
    void testUpdateProfileSuccess() throws Exception {
        mockMvc.perform(post("/profile/edit").with(user(mockUserDetails)).with(csrf())
                .param("fullName", "Updated Name")
                .param("bio", "Updated Bio")
                .param("phoneNumber", "1234567890")
                .param("location", "Test City"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/profile"))
                .andExpect(flash().attributeExists("successMessage"));
    }

    @Test
    void testToggleAvailability() throws Exception {
        mockMvc.perform(post("/profile/availability/toggle").with(user(mockUserDetails)).with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/profile"))
                .andExpect(flash().attributeExists("successMessage"));
    }
}
