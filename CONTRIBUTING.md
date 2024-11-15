# Contributing Guidelines

## Setting up your development environment

Start by following the setup instructions in [development.md](./development.md). Then, refer to the development guides in the [frontend](./application/frontend/README.md) and [backend](./application/backend/README.md) folders for stack-specific instructions.

## General guidelines

- **Keep pull requests small:** Submit **one** pull request per bug fix or feature, focusing solely on that change. Avoid refactoring unrelated code in the same pull request. Aim for several smaller PRs rather than one large one.

- **Include tests:** Add relevant unit or UI tests for new features. Follow existing patterns in the codebase.

- **Document changes in your PR:** Add comments or update documentation to explain what’s new or changed.

- **Fix CI failures as needed:** If the pull request fails CI checks, push a commit to address it.

- **Use clear comments:** Write code comments in complete sentences with proper punctuation.


## Code style

This repository enforces coding style and formatting automatically. Before submitting a pull request, run the linter locally or set up a [pre-commit hook](./development.md#set-up-pre-commit-hooks) to align with the style guidelines.

## Commit size and message

**Commit early and often!** Keep commits small, with each covering a focused change. Craft informative commit messages by following these guidelines:

1. Separate the subject line from the body with a blank line.
2. Limit the subject line to 50 characters.
3. Start the subject line with a capital letter.
4. Don’t end the subject line with a period.
5. Use the imperative mood in the subject (e.g., “Fix login issue”).
6. Wrap the body text at approximately 72 characters.
7. Explain **why** you made the change, not **what** or **how** (the code shows those).

**Example commit message:**

```
Brief summary of changes within 50 characters

Add more detail here if necessary, such as background on the issue
being fixed. Wrap the body at around 72 characters per line. The
subject and body should be separated by a blank line.

Explain the problem solved by this commit and why this approach
was taken, rather than how or what the code does. The code itself
will show those aspects. If relevant, discuss any side effects or
impacts of this change.

 - Use bullet points if needed
 - Start each bullet with a hyphen or asterisk, followed by a space

Reference any relevant GitHub issues:

Resolves: #123
See also: #456, #789
```

## Referencing Jira ticket

When creating a branch or opening a pull request, include the associated Jira ticket number at the beginning of the name. This reference is case-sensitive and should follow the format `GUAC-1234`.

* **Example branch name:** `GUAC-1234-add-user-login`
* **Example PR title:** GUAC-5678 Fix database connection issue

Including the Jira ticket number helps maintain traceability between code changes and project tasks, making it easier for reviewers and stakeholders to follow updates related to specific issues.
