# import os

from os import environ as env
from azure.identity import ClientSecretCredential
from azure.keyvault.secrets import SecretClient


def az_get_secret(secretName):
    # Acquire the resource URL. In this code we assume the resource URL is in an
    # environment variable, KEY_VAULT_URL in this case.
    AZURE_TENANT_ID = env.get("AZURE_TENANT_ID", "")
    AZURE_CLIENT_ID = env.get("AZURE_CLIENT_ID", "")
    AZURE_CLIENT_SECRET = env.get("AZURE_CLIENT_SECRET", "")
    AZURE_KEYVAULT_URL = env.get("AZURE_KEYVAULT_URL", "")
    # Acquire a credential object for the app identity. When running in the cloud,
    # DefaultAzureCredential uses the app's managed identity or user-assigned service principal.
    # When run locally, DefaultAzureCredential relies on environment variables named
    # AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and AZURE_TENANT_ID.

    _credential = ClientSecretCredential(
        tenant_id=AZURE_TENANT_ID,
        client_id=AZURE_CLIENT_ID,
        client_secret=AZURE_CLIENT_SECRET,
    )

    # Acquire an appropriate client object for the resource identified by the URL. The
    # client object only stores the given credential at this point but does not attempt
    # to authenticate it.
    #
    # **NOTE**: SecretClient here is only an example; the same process applies to all
    # other Azure client libraries.

    client = SecretClient(vault_url=AZURE_KEYVAULT_URL, credential=_credential)

    # Attempt to perform an operation on the resource using the client object (in
    # this case, retrieve a secret from Key Vault). The operation fails for any of
    # the following reasons:
    #
    # 1. The information in the credential object is invalid (for example, the AZURE_CLIENT_ID
    #    environment variable cannot be found).
    # 2. The app identity cannot be authenticated using the information in the credential object.
    # 3. The app identity is not authorized to perform the requested operation on the
    #    resource (identified in this case by the vault_url.
    secretValue = client.get_secret(secretName)

    return secretValue
