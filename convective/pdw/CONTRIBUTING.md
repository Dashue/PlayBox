# Guidelines

## Branching
Please create feature branches for all work on bugs, features, etc. 

1. When the work and a self review has been completed, please merge the latest
`master` into your feature branch. 
1. Then create a merge request that targets `master` and uses your feature
branch as the Source branch.

### Creating Merge Requests
1. Please provide a useful title for the Merge Request that is closely related
to the name of the issue in Trello.
1. Please make sure to link to the Trello issue in the description of your
Merge Request.
1. If the Merge Request is not yet ready for merging, please add `WIP: ` to the
front of Merge Request's title. This can be useful for preliminary code reviews.

## Commit Authoring
Please make sure that all commits come from your Convective account.
See the Git Config steps in the [README](README.md) for more details.

## <a name="commit"></a> Commit Message Guidelines

We have precise rules over how our git commit messages can be formatted. 
This leads to **more readable messages** that are easy to follow when looking
through the **project history**. This is aligned with the Angular team's
[commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

### Commit Message Format
Each commit message consists of a **header** and a **body**.
The header has a special format that includes a **type**, a **scope**
and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
* <body>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message should not be longer 100 characters.
This allows the message to be easier to read on GitLab as well as in various
git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `,
followed by the header of the reverted commit. In the body it should say: 
`This reverts commit <hash>.`, where the hash is the SHA of the commit being
reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space,
formatting, missing  semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the one word feature name or filename that this change
affects. In the case of a single file change to `user.service.ts`, the scope
would be `userService`. In the case of a change affecting many files related
to Authentication, the scope would be `auth`.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change"
not "changed" nor "changes". The body should include the motivation for the
change and contrast this with previous behavior. If there are more than one line in
the body, you should append `* ` to each line in order to get proper formatting
in GitLab.
