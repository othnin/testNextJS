from ninja import NinjaAPI, Schema
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_jwt.authentication import JWTAuth
from ninja_extra import NinjaExtraAPI
import helpers

#Can user as default
#api = NinjaExtraAPI(auth=helpers.api_auth_user_or_annon)
api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.add_router("/waitlists/", "waitlists.api.router")

class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str=None


@api.get("/hello")
def hello(request):
    print(request)
    return {"message": "Hello World!"}

@api.get("/me", response=UserSchema, auth=helpers.api_auth_user_required)
def me(request):
    return request.user

