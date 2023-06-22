enum Permissions {
  READ = 0x00000001,
  WRITE = 0x00000010,
  DELETE = 4,    // 00000100
  UPDATE = 8,    // 00001000
  ADMIN = 16,    // 00010000
}

export default Permissions;
