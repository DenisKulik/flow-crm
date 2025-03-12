<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar'
import SidebarMenuList from '~/components/SidebarMenuList.vue'
import { MENU_ITEMS } from '~/constants'
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Flow CRM</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuList :items="MENU_ITEMS" />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <UserDropdown />
    </SidebarFooter>
  </Sidebar>
</template>
