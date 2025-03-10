# Automatic Release Example

This project demonstrates how to automate versioning, changelog generation, and GitHub releases using **semantic-release**.

**semantic-release** automates the process of managing releases based on commit messages. It determines the version bump (major, minor, or patch) by analyzing the commit messages and automatically handles the release process.

## What Does This Project Do?

- **Automates versioning**: Automatically increments version numbers (MAJOR.MINOR.PATCH) based on commit messages.
- **Generates changelogs**: Automatically updates a changelog for every new release.
- **Publishes releases**: Creates GitHub releases and tags the repository with the correct version.

## How It Works

This process is automated by a **GitHub Actions workflow**. Here’s how it works:

1. Commit messages follow the **Conventional Commits** format:

   - `feat`: New features (minor version bump)
   - `fix`: Bug fixes (patch version bump)
   - `BREAKING CHANGE`: Breaking changes (major version bump)

2. **GitHub Actions Workflow**:

   - A GitHub Actions workflow is configured to run **semantic-release** when code is pushed to the `main` branch.
   - The workflow automatically triggers **semantic-release**, which:
     - Analyzes the commit history to determine the appropriate version bump.
     - Updates the changelog based on the commits.
     - Publishes the release and tags the repository with the new version on GitHub.
     - The workflow is located in `.github/workflows/release.yml` and looks like this:

   ```yaml
   name: Release

   on:
     push:
       branches:
         - main

   jobs:
     publish:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout Code
           uses: actions/checkout@v4

         - name: 🧙‍♂️ Install dependencies
           run: npm i

         - name: Run Semantic Release
           uses: cycjimmy/semantic-release-action@v4
           with:
             extra_plugins: |
               @semantic-release/git
               @semantic-release/exec
               @semantic-release/changelog
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

## Example Commit Messages

Each type of commit increments a specific part of the version **MAJOR.MINOR.PATCH**.

- **MAJOR**: Increments when you introduce changes that are not backward-compatible (Breaking Changes).
- **MINOR**: Increments when you add new functionality that is backward-compatible.
- **PATCH**: Increments when you fix bugs without breaking backward compatibility.

  ```plaintext
  feat(auth): add JWT authentication
  This will bump the version from 1.2.3 to 1.3.0.
  ```

- **Bug Fix**:
  ```plaintext
  fix(auth): fix JWT validation bug
  This will bump the version from 1.2.3 to 1.2.4.
  ```
- **Breaking Change**:
  ```plaintext
  feat(auth): refactor authentication system
  BREAKING CHANGE: Changes authentication logic
  This will bump the version from 1.2.3 to 2.0.0.
  ```
