# Contributing to TRTourPackage

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Run migrations: `npx prisma migrate dev`
5. Seed database: `npx tsx prisma/seed.ts`
6. Start dev server: `npm run dev`

## Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Adding New Languages

To add a new language to the platform:

1. Open `lib/translations.ts`
2. Add language code to `languages` object:
```typescript
export const languages = {
  // ... existing languages
  pt: 'Português'  // example
}
```

3. Add complete translation object:
```typescript
export const translations = {
  // ... existing translations
  pt: {
    travelerLogin: 'Login do Viajante',
    // ... all other keys (156 properties total)
  }
}
```

4. Ensure ALL 156 properties are translated
5. Test language switching
6. Run build: `npm run build`

## Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature`
2. Implement your feature
3. Add translations for all 12 languages
4. Test thoroughly
5. Update documentation
6. Submit a pull request

## Database Changes

1. Modify `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name your_migration_name`
3. Update seed data if needed
4. Test migration on clean database

## Testing

Before submitting:
- [ ] Build succeeds: `npm run build`
- [ ] All pages load without errors
- [ ] Language switching works
- [ ] Forms submit correctly
- [ ] API routes respond properly
- [ ] Database operations work
- [ ] Responsive design is maintained

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add Portuguese language support`
- `fix: Resolve language selector bug`
- `docs: Update README with new features`
- `style: Format code with prettier`
- `refactor: Simplify translation logic`

## Pull Request Process

1. Update README.md with details of changes
2. Update CHANGELOG.md
3. Ensure all tests pass
4. Request review from maintainers

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions
