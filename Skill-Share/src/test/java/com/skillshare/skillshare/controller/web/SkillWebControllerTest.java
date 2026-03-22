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
public class SkillWebControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SkillService skillService;

    @MockBean
    private UserProfileService userProfileService;

    private CustomUserDetails mockUserDetails;

    @BeforeEach
    void setUp() {
        mockUserDetails = mock(CustomUserDetails.class, org.mockito.Answers.RETURNS_DEEP_STUBS);
        when(mockUserDetails.getUser().getId()).thenReturn(1L);

        when(skillService.getSkillsByUser(anyLong())).thenReturn(new ArrayList<>());

        UserProfileDTO profileDTO = new UserProfileDTO();
        profileDTO.setMainSkillIds(new ArrayList<>());
        when(userProfileService.getProfileByUserId(anyLong())).thenReturn(profileDTO);
    }

    @Test
    void testShowManageSkillsPage() throws Exception {
        mockMvc.perform(get("/skills").with(user(mockUserDetails)))
                .andExpect(status().isOk())
                .andExpect(view().name("manage-skills"))
                .andExpect(model().attributeExists("skills"))
                .andExpect(model().attributeExists("categories"))
                .andExpect(model().attributeExists("proficiencies"))
                .andExpect(model().attributeExists("newSkillRequest"));
    }

    @Test
    void testAddSkill() throws Exception {
        mockMvc.perform(post("/skills/add").with(user(mockUserDetails)).with(csrf())
                .param("name", "Java Programming")
                .param("category", "PROGRAMMING")
                .param("proficiency", "EXPERT"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/skills"))
                .andExpect(flash().attributeExists("successParam"));
    }

    @Test
    void testDeleteSkill() throws Exception {
        mockMvc.perform(post("/skills/1/delete").with(user(mockUserDetails)).with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/skills"))
                .andExpect(flash().attributeExists("successParam"));
    }

    @Test
    void testToggleMainSkill() throws Exception {
        mockMvc.perform(post("/skills/1/toggle-main").with(user(mockUserDetails)).with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/skills"));
    }
}
