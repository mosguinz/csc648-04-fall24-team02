from typing import Any

from fastapi import APIRouter, HTTPException

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
)
from app.models import (
    FacilityBase,
    FacilityUpdate,
    UserAssembler,
    UserConstructor,
    UserMiner,
)

router = APIRouter()


@router.get(
    "/miner",
    response_model=list[UserMiner],
)
def read_miners(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Get miners for the selected user
    """
    # TODO add in validation
    miners = crud.read_user_miners_by_user(session=session, user_id=current_user.id)
    if not miners:
        raise HTTPException(status_code=404, detail="User miners not found")
    return miners


@router.post(
    "/miner",
    response_model=list[UserMiner],
)
def set_miners(
    session: SessionDep, current_user: CurrentUser, miners: list[UserMiner]
) -> Any:
    """
    Set miners for the selected user
    """
    # TODO add in validation
    curr_miners = crud.read_user_miners_by_user(
        session=session, user_id=current_user.id
    )
    for miner in miners:
        # grab corresponding existing resource
        miner_id = miner.id
        matching_miner = next(
            (mine for mine in curr_miners if mine.id == miner_id), None
        )
        # if the resource already exists
        if matching_miner:
            update_miner = FacilityUpdate(
                status=miner.status, recipe_id=miner.recipe_id
            )
            crud.update_user_miner(
                session=session, db_miner=matching_miner, miner_in=update_miner
            )
        else:
            new_miner = FacilityBase(
                status=miner.status,
                recipe_id=miner.recipe_id,
                facility_type_id=miner.facility_type_id,
            )
            crud.create_user_miner(
                session=session, miner_in=new_miner, user_id=current_user.id
            )
    return crud.read_user_miners_by_user(session=session, user_id=current_user.id)


@router.patch(
    "/miner",
    response_model=list[UserMiner],
)
def update_miners(
    session: SessionDep, current_user: CurrentUser, miners: list[UserMiner]
) -> Any:
    """
    Set miners for the selected user
    """
    # TODO add in validation
    curr_miners = crud.read_user_miners_by_user(
        session=session, user_id=current_user.id
    )
    for miner in miners:
        # grab corresponding existing resource
        miner_id = miner.id
        matching_miner = next(
            (mine for mine in curr_miners if mine.id == miner_id), None
        )
        # if the resource already exists update else do nothing
        if matching_miner:
            update_miner = FacilityUpdate(
                status=miner.status, recipe_id=miner.recipe_id
            )
            crud.update_user_miner(
                session=session, db_miner=matching_miner, miner_in=update_miner
            )
    return crud.read_user_miners_by_user(session=session, user_id=current_user.id)


@router.get(
    "/assembler",
    response_model=list[UserAssembler],
)
def read_assemblers(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Get assemblers for the selected user
    """
    # TODO add in validation
    assemblers = crud.read_user_assemblers_by_user(
        session=session, user_id=current_user.id
    )
    if not assemblers:
        raise HTTPException(status_code=404, detail="User assemblers not found")
    return assemblers


@router.post(
    "/assembler",
    response_model=list[UserAssembler],
)
def set_assemblers(
    session: SessionDep, current_user: CurrentUser, assemblers: list[UserAssembler]
) -> Any:
    """
    Set assemblers for the selected user
    """
    # TODO add in validation
    curr_assemblers = crud.read_user_assemblers_by_user(
        session=session, user_id=current_user.id
    )
    for assembler in assemblers:
        # grab corresponding existing resource
        assembler_id = assembler.id
        matching_assembler = next(
            (mine for mine in curr_assemblers if mine.id == assembler_id), None
        )
        # if the resource already exists
        if matching_assembler:
            update_assembler = FacilityUpdate(
                status=assembler.status, recipe_id=assembler.recipe_id
            )
            crud.update_user_assembler(
                session=session,
                db_assembler=matching_assembler,
                assembler_in=update_assembler,
            )
        else:
            assembler_in = FacilityBase(
                facility_type_id=assembler.facility_type_id,
                status=assembler.status,
                recipe_id=assembler.recipe_id,
            )
            crud.create_user_assembler(
                session=session, assembler_in=assembler_in, user_id=current_user.id
            )
    return crud.read_user_assemblers_by_user(session=session, user_id=current_user.id)


@router.patch(
    "/assembler",
    response_model=list[UserAssembler],
)
def update_assemblers(
    session: SessionDep, current_user: CurrentUser, assemblers: list[UserAssembler]
) -> Any:
    """
    Set assemblers for the selected user
    """
    # TODO add in validation
    curr_assemblers = crud.read_user_assemblers_by_user(
        session=session, user_id=current_user.id
    )
    for assembler in assemblers:
        # grab corresponding existing resource
        assembler_id = assembler.id
        matching_assembler = next(
            (mine for mine in curr_assemblers if str(mine.id) == assembler_id), None
        )
        # if the resource already exists update else do nothing
        if matching_assembler:
            update_assembler = FacilityUpdate(
                status=assembler.status, recipe_id=assembler.recipe_id
            )
            crud.update_user_assembler(
                session=session,
                db_assembler=matching_assembler,
                assembler_in=update_assembler,
            )
    return crud.read_user_assemblers_by_user(session=session, user_id=current_user.id)


@router.get(
    "/constructor",
    response_model=list[UserConstructor],
)
def read_constructors(session: SessionDep, current_user: CurrentUser) -> Any:
    """
    Get constructors for the selected user
    """
    # TODO add in validation
    constructors = crud.read_user_constructors_by_user(
        session=session, user_id=current_user.id
    )
    if not constructors:
        raise HTTPException(status_code=404, detail="User constructors not found")
    return constructors


@router.post(
    "/constructor",
    response_model=list[UserConstructor],
)
def set_constructors(
    session: SessionDep, current_user: CurrentUser, constructors: list[UserConstructor]
) -> Any:
    """
    Set constructors for the selected user
    """
    # TODO add in validation
    curr_constructors = crud.read_user_constructors_by_user(
        session=session, user_id=current_user.id
    )
    for constructor in constructors:
        # grab corresponding existing resource
        constructor_id = constructor.id
        matching_constructor = next(
            (mine for mine in curr_constructors if mine.id == constructor_id), None
        )
        # if the resource already exists
        if matching_constructor:
            update_constructor = FacilityUpdate(
                status=constructor.status, recipe_id=constructor.recipe_id
            )
            crud.update_user_constructor(
                session=session,
                db_constructor=matching_constructor,
                constructor_in=update_constructor,
            )
        else:
            constructor_in = FacilityBase(
                facility_type_id=constructor.facility_type_id,
                status=constructor.status,
                recipe_id=constructor.recipe_id,
            )
            crud.create_user_constructor(
                session=session, constructor_in=constructor_in, user_id=current_user.id
            )
    return crud.read_user_constructors_by_user(session=session, user_id=current_user.id)


@router.patch(
    "/constructor",
    response_model=list[UserConstructor],
)
def update_constructors(
    session: SessionDep, current_user: CurrentUser, constructors: list[UserConstructor]
) -> Any:
    """
    Set constructors for the selected user
    """
    # TODO add in validation
    curr_constructors = crud.read_user_constructors_by_user(
        session=session, user_id=current_user.id
    )
    for constructor in constructors:
        # grab corresponding existing resource
        constructor_id = constructor.id
        matching_constructor = next(
            (mine for mine in curr_constructors if mine.id == constructor_id), None
        )
        # if the resource already exists update else do nothing
        if matching_constructor:
            update_constructor = FacilityUpdate(
                status=constructor.status, recipe_id=constructor.recipe_id
            )
            crud.update_user_constructor(
                session=session,
                db_constructor=matching_constructor,
                constructor_in=update_constructor,
            )
    return crud.read_user_constructors_by_user(session=session, user_id=current_user.id)
