# Release Please Setup Guide

This guide provides setup instructions specifically for the `super-anki/anki-server` repository.

## Issue: GitHub Actions Permission Error

The release workflow may fail with the error:
```
GitHub Actions is not permitted to create or approve pull requests
```

This occurs because GitHub has security settings that prevent GitHub Actions from creating or approving pull requests using the default `GITHUB_TOKEN`.

## Solution

You have two options to fix this issue:

### Option 1: Enable GitHub Actions to Create Pull Requests (Recommended for Organizations)

If this repository is under an **organization**:

1. **Organization Settings**:
   - Go to your organization's Actions settings:
     `https://github.com/organizations/super-anki/settings/actions`
   - Find and enable **"Allow GitHub Actions to create and approve pull requests"**
   - This setting **must** be enabled at the organization level first

2. **Repository Settings**:
   - After enabling at the organization level, go to:
     `https://github.com/super-anki/anki-server/settings/actions`
   - Check **"Allow GitHub Actions to create and approve pull requests"**

### Option 2: Use a Personal Access Token (PAT)

If the repository is under a personal account or you prefer more control:

1. **Create a Personal Access Token**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Click "Generate new token"
   - Set the following:
     - **Token name**: `Release Please Token`
     - **Expiration**: Choose an appropriate expiration (recommend 90 days or 1 year)
     - **Repository access**: Select "Only select repositories" and choose `anki-server`
     - **Permissions**:
       - Contents: Read and write
       - Pull requests: Read and write
       - Metadata: Read-only (automatically selected)
   - Click "Generate token" and copy the token value

2. **Add the Token as a GitHub Secret**:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `RELEASE_PLEASE_TOKEN`
   - Value: Paste the token you copied
   - Click "Add secret"

3. **The workflow is already configured** to use this token:
   ```yaml
   token: ${{ secrets.RELEASE_PLEASE_TOKEN || secrets.GITHUB_TOKEN }}
   ```
   - If `RELEASE_PLEASE_TOKEN` exists, it will be used
   - Otherwise, it falls back to `GITHUB_TOKEN` (requires Option 1 to be configured)

## Verification

After implementing either option:

1. Make a commit to the `main` branch with a conventional commit message:
   ```bash
   git commit -m "feat: test release please configuration"
   ```

2. Push to `main`:
   ```bash
   git push origin main
   ```

3. Check the Actions tab to verify the Release workflow completes successfully

4. A pull request should be automatically created by release-please with version updates

## Additional Notes

- **Personal Accounts**: GitHub does not allow Actions to create/approve PRs on personal account repositories by default, so you **must** use Option 2 (PAT) for personal repositories.
- **Security**: Using a PAT provides more granular control but requires periodic renewal when it expires.
- **Machine Users**: For better security, consider creating a dedicated "bot" GitHub account for automation, generate a PAT from that account, and use it instead of your personal PAT.

## Resources

- [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
- [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [Release Please Action Documentation](https://github.com/googleapis/release-please-action)
