/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
    Authorigins = "_authOrigins",
    Externalauths = "_externalAuths",
    Mfas = "_mfas",
    Otps = "_otps",
    Superusers = "_superusers",
    Svgs = "svgs", // Modification ici (optionnel mais cohérent) Svg -> Svgs
    Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
    ? T extends unknown
        ? { expand?: unknown }
        : { expand: T }
    : { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
    id: RecordIdString
    collectionId: string
    collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
    email: string
    emailVisibility: boolean
    username: string
    verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
    collectionRef: string
    created?: IsoDateString
    fingerprint: string
    id: string
    recordRef: string
    updated?: IsoDateString
}

export type ExternalauthsRecord = {
    collectionRef: string
    created?: IsoDateString
    id: string
    provider: string
    providerId: string
    recordRef: string
    updated?: IsoDateString
}

export type MfasRecord = {
    collectionRef: string
    created?: IsoDateString
    id: string
    method: string
    recordRef: string
    updated?: IsoDateString
}

export type OtpsRecord = {
    collectionRef: string
    created?: IsoDateString
    id: string
    password: string
    recordRef: string
    sentTo?: string
    updated?: IsoDateString
}

export type SuperusersRecord = {
    created?: IsoDateString
    email: string
    emailVisibility?: boolean
    id: string
    password: string
    tokenKey: string
    updated?: IsoDateString
    verified?: boolean
}

// NOTE: J'ai renommé SvgRecord en SvgsRecord pour la cohérence, mais le nom du type lui-même n'est pas la cause de l'erreur.
export type SvgsRecord<Tchat_history = unknown> = {
    chat_history?: null | Tchat_history
    code_svg?: HTMLString // Correction: votre image montre "code_svg", pas "code"
    created_by?: RecordIdString // Correction: votre image montre "created_by"
    name?: string
    tags?: string[] | null // Correction: votre image montre "tags"
    creator?: RecordIdString // Correction: votre image montre "creator"
    user?: RecordIdString // Le champ 'user' est de type Relation, donc c'est un RecordIdString
}

export type UsersRecord = {
    avatar?: string
    name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
// J'ai aussi mis à jour les champs ici pour correspondre à votre image
export type SvgsResponse<Tchat_history = unknown, Texpand = unknown> = Required<SvgsRecord<Tchat_history>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
    _authOrigins: AuthoriginsRecord
    _externalAuths: ExternalauthsRecord
    _mfas: MfasRecord
    _otps: OtpsRecord
    _superusers: SuperusersRecord
    svgs: SvgsRecord // <-- MODIFICATION IMPORTANTE
    users: UsersRecord
}

export type CollectionResponses = {
    _authOrigins: AuthoriginsResponse
    _externalAuths: ExternalauthsResponse
    _mfas: MfasResponse
    _otps: OtpsResponse
    _superusers: SuperusersResponse
    svgs: SvgsResponse // <-- MODIFICATION IMPORTANTE
    users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
    collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
    collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
    collection(idOrName: '_mfas'): RecordService<MfasResponse>
    collection(idOrName: '_otps'): RecordService<OtpsResponse>
    collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
    collection(idOrName: 'svgs'): RecordService<SvgsResponse> // <-- MODIFICATION LA PLUS IMPORTANTE
    collection(idOrName: 'users'): RecordService<UsersResponse>
}